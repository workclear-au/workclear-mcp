import { search } from '../lib/api-client.js';

export interface SearchLicencesInput {
  query: string;
  state?: string;
  limit?: number;
}

export async function searchLicences(input: SearchLicencesInput) {
  const { query, state, limit } = input;

  // Determine search type
  const trimmed = query.trim();
  const isABN = /^\d{10,11}$/.test(trimmed.replace(/\s/g, ''));
  const type = isABN ? 'abn' : 'name';

  const result = await search(trimmed, { state, type, limit });

  if (!result.ok) {
    return {
      query: trimmed,
      state: state ?? 'all',
      count: 0,
      results: [],
      error: result.error ?? 'API request failed',
    };
  }

  const data = result.data!;
  return {
    query: trimmed,
    state: state ?? 'all',
    count: data.count,
    results: data.results.map((r) => ({
      licence_number: r.licence_number,
      licensee_name: r.licensee_name,
      state: r.state,
      abn: r.abn ?? null,
      licence_type: r.licence_type ?? null,
      licence_classes: r.licence_classes ?? [],
      expiry_date: r.expiry_date ?? null,
    })),
  };
}
