/**
 * WorkClear API client — all requests go through the REST API.
 * No Supabase dependency.
 */

const DEFAULT_BASE_URL = 'https://workclear.com.au';

function getConfig() {
  const apiKey = process.env.WORKCLEAR_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing WORKCLEAR_API_KEY environment variable. ' +
        'Get your API key from https://workclear.com.au/dashboard/keys',
    );
  }

  const baseUrl = (process.env.WORKCLEAR_API_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
  return { apiKey, baseUrl };
}

export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

async function request<T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
  const { apiKey, baseUrl } = getConfig();

  const url = new URL(path, baseUrl);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value);
      }
    }
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-api-key': apiKey,
      'Accept': 'application/json',
      'User-Agent': '@workclear/mcp-server/2.0.0',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    let errorMessage: string;
    try {
      const parsed = JSON.parse(errorBody);
      errorMessage = parsed.error || `HTTP ${response.status}`;
    } catch {
      errorMessage = `HTTP ${response.status}: ${errorBody || response.statusText}`;
    }

    return { ok: false, status: response.status, error: errorMessage };
  }

  const data = await response.json() as T;
  return { ok: true, status: response.status, data };
}

// --- Verify ---

export interface VerifyResult {
  status: 'active' | 'expired' | 'inactive' | 'not_found';
  state?: string;
  licence_number?: string;
  licensee_name?: string;
  abn?: string | null;
  acn?: string | null;
  business_address?: string | null;
  licence_type?: string | null;
  financial_category?: string | null;
  issue_date?: string | null;
  expiry_date?: string | null;
  licence_classes?: Array<{ grade?: string | null; class: string }>;
  source?: string;
}

export async function verify(licenceNumber: string, state?: string): Promise<ApiResponse<VerifyResult>> {
  const params: Record<string, string> = { licence_number: licenceNumber };
  if (state) params.state = state;
  return request<VerifyResult>('/api/v1/verify', params);
}

// --- Search ---

export interface SearchResult {
  count: number;
  results: Array<{
    state: string;
    licence_number: string;
    licensee_name: string;
    abn: string | null;
    licence_type: string | null;
    licence_classes?: Array<{ grade?: string | null; class: string }>;
    expiry_date?: string | null;
  }>;
}

export async function search(
  query: string,
  options?: { state?: string; type?: string; limit?: number },
): Promise<ApiResponse<SearchResult>> {
  const params: Record<string, string> = { q: query };
  if (options?.state) params.state = options.state;
  if (options?.type) params.type = options.type;
  if (options?.limit) params.limit = String(options.limit);
  return request<SearchResult>('/api/v1/search', params);
}

// --- Status ---

export interface StatusResult {
  licence_number: string;
  licensee_name?: string;
  state?: string;
  found: boolean;
  is_valid: boolean;
  status?: string;
  expiry_date?: string | null;
  message?: string;
  note?: string;
}

export async function checkStatus(licenceNumber: string, state?: string): Promise<ApiResponse<StatusResult>> {
  const params: Record<string, string> = { licence_number: licenceNumber };
  if (state) params.state = state;
  return request<StatusResult>('/api/v1/status', params);
}

// --- Coverage ---

export interface CoverageResult {
  total_records: number;
  states_covered: number;
  states: Array<{
    state: string;
    source: string;
    source_url: string;
    records: number;
    last_updated: string | null;
    data_as_of: string | null;
    notes: string | null;
  }>;
}

export async function getCoverage(): Promise<ApiResponse<CoverageResult>> {
  return request<CoverageResult>('/api/v1/coverage');
}
