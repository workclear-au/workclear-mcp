# Project Status

## Hibernating

The WorkClear MCP server entered hibernation on 22 September 2026.

The package was an early adapter over the WorkClear REST API. There is no active
MCP product roadmap or automatic publishing workflow, and current WorkClear
sales/outreach should not present MCP as a supported product surface.

Existing npm version `1.0.2` remains available so existing installations are not
broken. It is not deprecated or deleted, but new features and routine dependency
releases are paused. The supported integration path is the
[WorkClear REST API and OpenAPI contract](https://www.workclear.com.au/docs).

## Reactivation Requirements

Reactivation requires:

1. confirmed customer, design-partner or durable internal-agent demand;
2. review against the current MCP protocol and WorkClear API contract;
3. current dependency, build, security and deployed integration validation;
4. one reconciled public source of truth;
5. npm Trusted Publishing using short-lived OIDC credentials;
6. a deliberate versioned release with release notes.

General interest in agentic software is not sufficient by itself.

For security concerns or future integration enquiries, use the
[WorkClear contact page](https://www.workclear.com.au/contact).
