import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { execGit } from '../utils/git.js';

/**
 * Phase 2/3 — returns detailed commit info: metadata, file stats, and diff.
 */
export function registerGetCommitDetailsTool(server: McpServer): void {
  server.tool(
    'get_commit_details',
    'Phase 2/3: Returns full metadata and diff for a specific commit. Use statsOnly=true for a quick overview, or provide a diffFilter glob to focus on specific files.',
    {
      commitHash: z.string(),
      diffFilter: z.string().optional(),
      statsOnly: z.boolean().optional(),
    } as any,
    async (args: any) => {
      const commitHash: string = args.commitHash;
      const diffFilter: string | undefined = args.diffFilter;
      const statsOnly: boolean = args.statsOnly ?? false;

      // Get commit metadata
      const meta = await execGit(['show', '--no-patch', '--format=%H%n%ai%n%an <%ae>%n%s%n%b', commitHash]);
      const [fullHash, date, authorInfo, subject, ...bodyLines] = meta.trim().split('\n');
      const body = bodyLines.join('\n').trim();

      // Get file-level stats
      const statOutput = await execGit(['show', '--stat', '--no-patch', '--format=', commitHash]);

      let diffText = '';
      if (!statsOnly) {
        const diffArgs = ['show', '--format=', commitHash];
        if (diffFilter) {
          diffArgs.push('--', diffFilter);
        }
        const rawDiff = await execGit(diffArgs);
        // Truncate very large diffs to avoid overwhelming the client
        const maxLen = 15000;
        diffText = rawDiff.length > maxLen
          ? rawDiff.slice(0, maxLen) + `\n\n... [diff truncated at ${maxLen} chars, ${rawDiff.length} total] ...`
          : rawDiff;
      }

      const result = [
        `## Commit: ${fullHash}`,
        `- **Date:** ${date}`,
        `- **Author:** ${authorInfo}`,
        `- **Subject:** ${subject}`,
        body ? `- **Body:**\n${body}` : '',
        '',
        '### Files changed',
        statOutput.trim(),
        '',
        ...(statsOnly ? [] : ['### Diff', '```diff', diffText.trim(), '```']),
      ].filter(Boolean).join('\n');

      return { content: [{ type: 'text' as const, text: result }] };
    },
  );
}
