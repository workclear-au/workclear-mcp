import { verify } from '../lib/api-client.js';

export interface VerifyLicenceInput {
  licence_number: string;
  state?: string;
}

export async function verifyLicence(input: VerifyLicenceInput) {
  const { licence_number, state } = input;

  const result = await verify(licence_number, state);

  if (!result.ok) {
    return {
      found: false,
      licence_number,
      state: state ?? 'all',
      error: result.error ?? 'API request failed',
    };
  }

  const data = result.data!;

  if (data.status === 'not_found') {
    return {
      found: false,
      licence_number,
      state: state ?? 'all',
      message:
        'No licence found matching this number' +
        (state ? ` in ${state}` : ' in any state'),
    };
  }

  return {
    found: true,
    licence: {
      licence_number: data.licence_number,
      licensee_name: data.licensee_name,
      state: data.state,
      status: data.status,
      licence_type: data.licence_type ?? null,
      licence_classes: data.licence_classes ?? [],
      abn: data.abn ?? null,
      acn: data.acn ?? null,
      address: data.business_address ?? null,
      issue_date: data.issue_date ?? null,
      expiry_date: data.expiry_date ?? null,
      source: data.source ?? null,
    },
  };
}
