#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { verifyLicence } from './tools/verify.js';
import { searchLicences } from './tools/search.js';
import { checkLicenceStatus } from './tools/status.js';
import { getDataCoverage } from './tools/coverage.js';
const server = new McpServer({
    name: 'workclear',
    version: '2.0.0',
});
// --- Tool: verify_licence ---
server.tool('verify_licence', 'Verify an Australian contractor licence by its licence number. Returns full licence details including holder name, status, class, expiry, and ABN. Optionally filter by state.', {
    licence_number: z
        .string()
        .describe('The licence number to verify'),
    state: z
        .string()
        .optional()
        .describe('Australian state/territory code (QLD, NSW, VIC, ACT, NT, WA, SA, TAS). Searches all states if omitted.'),
}, async ({ licence_number, state }) => {
    try {
        const result = await verifyLicence({ licence_number, state });
        return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
    }
    catch (err) {
        return {
            content: [{ type: 'text', text: err.message }],
            isError: true,
        };
    }
});
// --- Tool: search_licences ---
server.tool('search_licences', 'Search Australian contractor licences by business name, person name, or ABN. Returns matching licence records. Supports state filtering and result limits.', {
    query: z
        .string()
        .describe('Search term — business name, person name, or ABN (11 digits)'),
    state: z
        .string()
        .optional()
        .describe('Filter by state/territory (QLD, NSW, VIC, ACT, NT, WA, SA, TAS)'),
    limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .default(10)
        .describe('Maximum results to return (1-50, default 10)'),
}, async ({ query, state, limit }) => {
    try {
        const result = await searchLicences({ query, state, limit });
        return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
    }
    catch (err) {
        return {
            content: [{ type: 'text', text: err.message }],
            isError: true,
        };
    }
});
// --- Tool: check_licence_status ---
server.tool('check_licence_status', 'Quick check whether an Australian contractor licence is currently valid. Returns a yes/no validity flag plus status and expiry date.', {
    licence_number: z
        .string()
        .describe('The licence number to check'),
    state: z
        .string()
        .optional()
        .describe('Australian state/territory (QLD, NSW, VIC, ACT, NT, WA, SA, TAS). Recommended for accuracy.'),
}, async ({ licence_number, state }) => {
    try {
        const result = await checkLicenceStatus({ licence_number, state });
        return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
    }
    catch (err) {
        return {
            content: [{ type: 'text', text: err.message }],
            isError: true,
        };
    }
});
// --- Tool: get_coverage ---
server.tool('get_coverage', "Get WorkClear's current data coverage — which Australian states are available, how many licence records per state, and when data was last updated.", {}, async () => {
    try {
        const result = await getDataCoverage();
        return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
    }
    catch (err) {
        return {
            content: [{ type: 'text', text: err.message }],
            isError: true,
        };
    }
});
// --- Start server ---
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // Server is now listening on stdio. It will exit when the transport closes.
}
main().catch((err) => {
    console.error('Fatal error starting WorkClear MCP server:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map