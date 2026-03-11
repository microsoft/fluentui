# @fluentui/react-charts-mcp-server

MCP (Model Context Protocol) server that exposes tools for working with Fluent UI React Charts.

## Setup

```bash
cd packages/charts/react-charts/mcp-server
npm install
npm run build
```

## Running

```bash
npm start
```

The server communicates over **stdio** and is designed to be used with MCP-compatible clients (e.g., Claude Code, VS Code extensions).

### Claude Code configuration

Add to your `.claude/settings.json` or project `.mcp.json`:

```json
{
  "mcpServers": {
    "react-charts": {
      "command": "node",
      "args": ["packages/charts/react-charts/mcp-server/dist/index.js"]
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `list_charts` | Lists available chart types with optional category filter |

## Adding a New Tool

1. Create a new file in `src/tools/` (e.g., `src/tools/myTool.ts`):

```typescript
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export function registerMyTool(server: McpServer): void {
  server.tool(
    'my_tool_name',
    'Description of what the tool does',
    async (extra) => {
      // Tool implementation
      return {
        content: [{ type: 'text' as const, text: 'Result from my tool' }],
      };
    },
  );
}
```

2. Register it in `src/tools/index.ts`:

```typescript
import { registerMyTool } from './myTool.js';

export function registerTools(server: McpServer): void {
  registerListChartsTool(server);
  registerMyTool(server);
}
```

3. Rebuild: `npm run build`
