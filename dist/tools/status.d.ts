export interface CheckLicenceStatusInput {
    licence_number: string;
    state?: string;
}
export declare function checkLicenceStatus(input: CheckLicenceStatusInput): Promise<import("../lib/api-client.js").StatusResult | {
    licence_number: string;
    state: string;
    error: string;
}>;
//# sourceMappingURL=status.d.ts.map