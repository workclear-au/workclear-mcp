/**
 * WorkClear API client — all requests go through the REST API.
 * No Supabase dependency.
 */
const DEFAULT_BASE_URL = 'https://workclear.com.au';
function getConfig() {
    const apiKey = process.env.WORKCLEAR_API_KEY;
    if (!apiKey) {
        throw new Error('Missing WORKCLEAR_API_KEY environment variable. ' +
            'Get your API key from https://workclear.com.au/dashboard/keys');
    }
    const baseUrl = (process.env.WORKCLEAR_API_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
    return { apiKey, baseUrl };
}
async function request(path, params) {
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
        let errorMessage;
        try {
            const parsed = JSON.parse(errorBody);
            errorMessage = parsed.error || `HTTP ${response.status}`;
        }
        catch {
            errorMessage = `HTTP ${response.status}: ${errorBody || response.statusText}`;
        }
        return { ok: false, status: response.status, error: errorMessage };
    }
    const data = await response.json();
    return { ok: true, status: response.status, data };
}
export async function verify(licenceNumber, state) {
    const params = { licence_number: licenceNumber };
    if (state)
        params.state = state;
    return request('/api/v1/verify', params);
}
export async function search(query, options) {
    const params = { q: query };
    if (options?.state)
        params.state = options.state;
    if (options?.type)
        params.type = options.type;
    if (options?.limit)
        params.limit = String(options.limit);
    return request('/api/v1/search', params);
}
export async function checkStatus(licenceNumber, state) {
    const params = { licence_number: licenceNumber };
    if (state)
        params.state = state;
    return request('/api/v1/status', params);
}
export async function getCoverage() {
    return request('/api/v1/coverage');
}
//# sourceMappingURL=api-client.js.map