import { checkStatus } from '../lib/api-client.js';

export interface CheckLicenceStatusInput {
  licence_number: string;
  state?: string;
}

export async function checkLicenceStatus(input: CheckLicenceStatusInput) {
  const { licence_number, state } = input;

  const result = await checkStatus(licence_number, state);

  if (!result.ok) {
    return {
      licence_number,
      state: state ?? 'all',
      error: result.error ?? 'API request failed',
    };
  }

  return result.data!;
}
