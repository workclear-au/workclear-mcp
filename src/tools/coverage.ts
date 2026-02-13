import { getCoverage } from '../lib/api-client.js';

export async function getDataCoverage() {
  const result = await getCoverage();

  if (!result.ok) {
    return {
      error: result.error ?? 'API request failed',
    };
  }

  return result.data!;
}
