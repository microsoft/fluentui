import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { execGit } from '../utils/git.js';

/**
 * Phase 2 support — search and filter commits to narrow down regression candidates.
 */
export function registerSearchCommitsTool(server: McpServer): void {
  server.tool(
    'search_commits',
    'Phase 2: Search commit history with filters (keyword, path, author, date range). Returns commit hashes, messages, dates, and changed file counts to help narrow down regression candidates.',
    {
      keyword: z.string().optional(),
      path: z.string().optional(),
      author: z.string().optional(),
      sinceDate: z.string().optional(),
      untilDate: z.string().optional(),
      maxCount: z.number().optional(),
    } as any,
    async (args: any) => {
      const keyword: string | undefined = args.keyword;
      const path: string | undefined = args.path;
      const author: string | undefined = args.author;
      const sinceDate: string | undefined = args.sinceDate;
      const untilDate: string | undefined = args.untilDate;
      const maxCount: number = args.maxCount ?? 30;

      const limit = maxCount;
      const gitArgs = ['log', `--max-count=${limit}`, '--format=%H|%ai|%an|%s'];

      if (keyword) {
        gitArgs.push(`--grep=${keyword}`, '-i');
      }
      if (author) {
        gitArgs.push(`--author=${author}`);
      }
      if (sinceDate) {
        gitArgs.push('--since', sinceDate);
      }
      if (untilDate) {
        gitArgs.push('--until', untilDate);
      }
      if (path) {
        gitArgs.push('--', path);
      }

      const log = await execGit(gitArgs);
      const lines = log.trim().split('\n').filter(Boolean);

      if (lines.length === 0) {
        return { content: [{ type: 'text' as const, text: 'No commits found matching the given filters.' }] };
      }

      // For each commit, get the number of files changed (lightweight stat)
      const results: string[] = [`## Found ${lines.length} commit(s)\n`];
      for (const line of lines) {
        const [hash, date, authorName, ...msgParts] = line.split('|');
        const message = msgParts.join('|');
        // Get file count changed
        const statOutput = await execGit(['diff-tree', '--no-commit-id', '--name-only', '-r', hash]);
        const filesChanged = statOutput.trim().split('\n').filter(Boolean).length;

        results.push(`- \`${hash}\` ${date.slice(0, 10)} (${filesChanged} files) — ${message}`);
      }

      results.push(
        '',
        '### Next steps',
        '- Use `get_commit_details` on suspect commits to see full diffs.',
        '- Use `prepare_regression_test` with the suspect SHAs to generate a validation plan, then dispatch parallel sub-agents and call `analyze_regression_results`.',
      );

      return { content: [{ type: 'text' as const, text: results.join('\n') }] };
    },
  );
}
