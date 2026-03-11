#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools/index.js';

const server = new McpServer({
  name: 'react-charts-mcp',
  version: '0.1.0',
});

// Register all tools with the server
registerTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('React Charts MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
