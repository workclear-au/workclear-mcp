export interface VerifyLicenceInput {
    licence_number: string;
    state?: string;
}
export declare function verifyLicence(input: VerifyLicenceInput): Promise<{
    found: boolean;
    licence_number: string;
    state: string;
    error: string;
    message?: undefined;
    licence?: undefined;
} | {
    found: boolean;
    licence_number: string;
    state: string;
    message: string;
    error?: undefined;
    licence?: undefined;
} | {
    found: boolean;
    licence: {
        licence_number: string | undefined;
        licensee_name: string | undefined;
        state: string | undefined;
        status: "active" | "expired" | "inactive";
        licence_type: string | null;
        licence_classes: {
            grade?: string | null;
            class: string;
        }[];
        abn: string | null;
        acn: string | null;
        address: string | null;
        issue_date: string | null;
        expiry_date: string | null;
        source: string | null;
    };
    licence_number?: undefined;
    state?: undefined;
    error?: undefined;
    message?: undefined;
}>;
//# sourceMappingURL=verify.d.ts.map