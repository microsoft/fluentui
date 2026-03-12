import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerTriageIssueTool } from './triageIssue.js';

/**
 * Central registry for all MCP tools.
 *
 * To add a new tool:
 * 1. Create a new file in this directory (e.g., myTool.ts)
 * 2. Export a `registerMyTool(server: McpServer)` function
 * 3. Import and call it here
 */
export function registerTools(server: McpServer): void {
  registerTriageIssueTool(server);
}
