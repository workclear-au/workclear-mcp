# @workclear/mcp-server

MCP (Model Context Protocol) server for Australian contractor licence verification via the [WorkClear](https://workclear.com.au) API.

Verify contractor licences across QLD, NSW, VIC, SA, ACT, and NT directly from AI agents like Claude, ChatGPT, or any MCP-compatible client.

## Quick Start

### 1. Get an API key

Sign up at [workclear.com.au](https://workclear.com.au/signup) and create an API key in your [dashboard](https://workclear.com.au/dashboard/keys).

### 2. Configure your MCP client

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "workclear": {
      "command": "npx",
      "args": ["-y", "@workclear/mcp-server"],
      "env": {
        "WORKCLEAR_API_KEY": "wc_live_your_key_here"
      }
    }
  }
}
```

Or run directly:

```bash
WORKCLEAR_API_KEY=wc_live_your_key_here npx @workclear/mcp-server
```

## Tools

### `verify_licence`

Verify a specific contractor licence by number.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `licence_number` | string | ✅ | The licence number to verify |
| `state` | string | ❌ | State code (QLD, NSW, VIC, ACT, NT, WA, SA, TAS) |

**Example:** "Verify QBCC licence 54898"

### `search_licences`

Search licences by business name, person name, or ABN.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search term |
| `state` | string | ❌ | Filter by state |
| `limit` | number | ❌ | Max results (1-50, default 10) |

**Example:** "Search for licence holders named Smith in QLD"

### `check_licence_status`

Quick validity check — is a licence currently active?

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `licence_number` | string | ✅ | The licence number |
| `state` | string | ❌ | State code (recommended) |

**Example:** "Is licence 12345 still valid in NSW?"

### `get_coverage`

Check which states are available and how many records are in the database.

No parameters required.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `WORKCLEAR_API_KEY` | ✅ | — | Your WorkClear API key |
| `WORKCLEAR_API_URL` | ❌ | `https://workclear.com.au` | API base URL (for self-hosted) |

## API Limits

Your API call limits depend on your WorkClear plan:

| Plan | API + MCP calls/month | Price |
|------|----------------------|-------|
| Free | Web only (no API) | $0 |
| Pro | 1,000 | $29/mo |
| Business | 10,000 | $99/mo |
| Enterprise | Unlimited | Custom |

Each MCP tool call counts as one API call. Upgrade at [workclear.com.au/pricing](https://workclear.com.au/pricing).

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development mode
WORKCLEAR_API_KEY=your_key npm run dev
```

## Publishing

```bash
# Bump version
npm version patch   # 1.0.0 → 1.0.1

# Build and publish
npm run build
npm publish --access public
```

## License

MIT — see [LICENSE](LICENSE) for details.
