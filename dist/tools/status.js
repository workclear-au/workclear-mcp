import { checkStatus } from '../lib/api-client.js';
export async function checkLicenceStatus(input) {
    const { licence_number, state } = input;
    const result = await checkStatus(licence_number, state);
    if (!result.ok) {
        return {
            licence_number,
            state: state ?? 'all',
            error: result.error ?? 'API request failed',
        };
    }
    return result.data;
}
//# sourceMappingURL=status.js.map