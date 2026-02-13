/**
 * WorkClear API client — all requests go through the REST API.
 * No Supabase dependency.
 */
export interface ApiResponse<T> {
    ok: boolean;
    status: number;
    data?: T;
    error?: string;
}
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
    licence_classes?: Array<{
        grade?: string | null;
        class: string;
    }>;
    source?: string;
}
export declare function verify(licenceNumber: string, state?: string): Promise<ApiResponse<VerifyResult>>;
export interface SearchResult {
    count: number;
    results: Array<{
        state: string;
        licence_number: string;
        licensee_name: string;
        abn: string | null;
        licence_type: string | null;
        licence_classes?: Array<{
            grade?: string | null;
            class: string;
        }>;
        expiry_date?: string | null;
    }>;
}
export declare function search(query: string, options?: {
    state?: string;
    type?: string;
    limit?: number;
}): Promise<ApiResponse<SearchResult>>;
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
export declare function checkStatus(licenceNumber: string, state?: string): Promise<ApiResponse<StatusResult>>;
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
export declare function getCoverage(): Promise<ApiResponse<CoverageResult>>;
//# sourceMappingURL=api-client.d.ts.map