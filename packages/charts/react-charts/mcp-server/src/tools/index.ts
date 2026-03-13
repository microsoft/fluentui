import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerScopeRegressionTool } from './scopeRegression.js';
import { registerSearchCommitsTool } from './searchCommits.js';
import { registerGetCommitDetailsTool } from './getCommitDetails.js';
import { registerFindCulpritTool } from './findCulprit.js';
import { registerScoreCommitsTool } from './scoreCommits.js';
import { registerPrepareRegressionTestTool, registerAnalyzeRegressionResultsTool } from './regressionValidator.js';

/**
 * Central registry for all MCP tools.
 *
 * To add a new tool:
 * 1. Create a new file in this directory (e.g., myTool.ts)
 * 2. Export a `registerMyTool(server: McpServer)` function
 * 3. Import and call it here
 */
export function registerTools(server: McpServer): void {
  // Smart bisect pipeline tools
  registerScopeRegressionTool(server);           // Phase 1: Scoping
  registerSearchCommitsTool(server);              // Phase 2: Narrowing
  registerGetCommitDetailsTool(server);           // Phase 2/3: Inspection
  registerFindCulpritTool(server);                // Phase 2/4: Reverse culprit search
  registerScoreCommitsTool(server);               // Phase 2: GitHub API fetch + score
  registerPrepareRegressionTestTool(server);      // Phase 3: Validation — plan
  registerAnalyzeRegressionResultsTool(server);   // Phase 3: Validation — analyze
}
