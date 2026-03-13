import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { execGit } from '../utils/git.js';

/**
 * Phase 1 — Scoping: identifies relevant files and recent commits for a given chart component.
 */
export function registerScopeRegressionTool(server: McpServer): void {
  server.tool(
    'scope_regression',
    'Phase 1: Given a chart component name, finds all source files and recent commits touching that component. Use this to scope which files and commits are relevant to a reported regression.',
    {
      component: z.string(),
      sinceDate: z.string().optional(),
      untilDate: z.string().optional(),
    } as any,
    async (args: any) => {
      const component: string = args.component;
      const sinceDate: string | undefined = args.sinceDate;
      const untilDate: string | undefined = args.untilDate;

      const componentPath = resolveComponentPath(component);

      // Find all source files for this component
      const files = await execGit(['ls-files', '--', componentPath]);
      const fileList = files.trim().split('\n').filter(Boolean);

      // Build git log command
      const since = sinceDate ?? getDefaultSinceDate();
      const logArgs = ['log', '--oneline', '--since', since];
      if (untilDate) {
        logArgs.push('--until', untilDate);
      }
      logArgs.push('--', componentPath);
      const log = await execGit(logArgs);

      // Also find shared utilities that this component might depend on
      const sharedPaths = getSharedDependencyPaths(component);
      let sharedLog = '';
      if (sharedPaths.length > 0) {
        const sharedLogArgs = ['log', '--oneline', '--since', since];
        if (untilDate) {
          sharedLogArgs.push('--until', untilDate);
        }
        sharedLogArgs.push('--', ...sharedPaths);
        sharedLog = await execGit(sharedLogArgs);
      }

      const result = [
        `## Scoping: ${component}`,
        '',
        `### Source files (${fileList.length})`,
        fileList.map(f => `- ${f}`).join('\n'),
        '',
        `### Commits touching ${component} (since ${since})`,
        log.trim() || '_No commits found_',
        '',
        `### Commits touching shared utilities (since ${since})`,
        sharedLog.trim() || '_No commits found_',
        '',
        '### Suggested next steps',
        '1. Use `search_commits` to narrow down suspect commits from the lists above.',
        '2. Use `get_commit_details` to inspect individual commits.',
        '3. Use `prepare_regression_test` with the suspect SHAs to get a validation plan, then run it with parallel sub-agents and call `analyze_regression_results`.',
      ].join('\n');

      return { content: [{ type: 'text' as const, text: result }] };
    },
  );
}

function resolveComponentPath(component: string): string {
  const name = component.replace(/\s+/g, '');
  return `packages/charts/react-charts/library/src/components/${name}/`;
}

function getSharedDependencyPaths(_component: string): string[] {
  return [
    'packages/charts/react-charts/library/src/utilities/',
    'packages/charts/react-charts/library/src/types/',
    'packages/charts/chart-utilities/src/',
  ];
}

function getDefaultSinceDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return d.toISOString().slice(0, 10);
}
