import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListChartsTool } from './listCharts.js';
import { registerScoreCommitsTool } from './scoreCommits.js';

/**
 * Central registry for all MCP tools.
 *
 * To add a new tool:
 * 1. Create a new file in this directory (e.g., myTool.ts)
 * 2. Export a `registerMyTool(server: McpServer)` function
 * 3. Import and call it here
 */
export function registerTools(server: McpServer): void {
  registerListChartsTool(server);

  registerScoreCommitsTool(server);
  // Add new tools here:
}
