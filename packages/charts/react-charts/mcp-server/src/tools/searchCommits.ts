import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { execGit } from '../utils/git.js';

const InputSchema = z.object({
  keyword: z.string().optional().describe('Search commit messages for this keyword (e.g. "fix", "regression", "revert")'),
  path: z.string().optional().describe('Limit to commits touching this file or directory path'),
  author: z.string().optional().describe('Filter by commit author name or email'),
  sinceDate: z.string().optional().describe('Start date (ISO format, e.g. "2025-06-01")'),
  untilDate: z.string().optional().describe('End date (ISO format)'),
  maxCount: z.number().optional().describe('Max number of commits to return (default: 30)'),
});

/**
 * Phase 2 support — search and filter commits to narrow down regression candidates.
 */
export function registerSearchCommitsTool(server: McpServer): void {
  server.tool(
    'search_commits',
    'Phase 2: Search commit history with filters (keyword, path, author, date range). Returns commit hashes, messages, dates, and changed file counts to help narrow down regression candidates.',
    InputSchema.shape,
    async ({ keyword, path, author, sinceDate, untilDate, maxCount }) => {
      const limit = maxCount ?? 30;
      const args = ['log', `--max-count=${limit}`, '--format=%H|%ai|%an|%s'];

      if (keyword) {
        args.push(`--grep=${keyword}`, '-i');
      }
      if (author) {
        args.push(`--author=${author}`);
      }
      if (sinceDate) {
        args.push('--since', sinceDate);
      }
      if (untilDate) {
        args.push('--until', untilDate);
      }
      if (path) {
        args.push('--', path);
      }

      const log = await execGit(args);
      const lines = log.trim().split('\n').filter(Boolean);

      if (lines.length === 0) {
        return { content: [{ type: 'text' as const, text: 'No commits found matching the given filters.' }] };
      }

      // For each commit, get the number of files changed (lightweight stat)
      const results: string[] = [`## Found ${lines.length} commit(s)\n`];
      for (const line of lines) {
        const [hash, date, authorName, ...msgParts] = line.split('|');
        const message = msgParts.join('|');
        const shortHash = hash.slice(0, 10);

        // Get file count changed
        const statOutput = await execGit(['diff-tree', '--no-commit-id', '--name-only', '-r', hash]);
        const filesChanged = statOutput.trim().split('\n').filter(Boolean).length;

        results.push(`- \`${shortHash}\` ${date.slice(0, 10)} (${filesChanged} files) — ${message}`);
      }

      results.push('', '### Next step', 'Use `get_commit_details` on suspect commits to see full diffs.');

      return { content: [{ type: 'text' as const, text: results.join('\n') }] };
    },
  );
}
