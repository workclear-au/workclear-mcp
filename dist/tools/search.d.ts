export interface SearchLicencesInput {
    query: string;
    state?: string;
    limit?: number;
}
export declare function searchLicences(input: SearchLicencesInput): Promise<{
    query: string;
    state: string;
    count: number;
    results: never[];
    error: string;
} | {
    query: string;
    state: string;
    count: number;
    results: {
        licence_number: string;
        licensee_name: string;
        state: string;
        abn: string | null;
        licence_type: string | null;
        licence_classes: {
            grade?: string | null;
            class: string;
        }[];
        expiry_date: string | null;
    }[];
    error?: undefined;
}>;
//# sourceMappingURL=search.d.ts.map