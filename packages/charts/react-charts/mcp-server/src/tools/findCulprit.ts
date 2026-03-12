import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { execGit } from '../utils/git.js';

const InputSchema = z.object({
  fixCommit: z.string().describe('The commit hash that fixed the regression'),
  searchDepth: z.number().optional().describe('How many commits back to search for the introducing commit (default: 50)'),
});

/**
 * Phase 2/4 — Given a fix commit, reverse-engineers which earlier commit likely introduced the regression
 * by analyzing which files the fix touches and finding earlier commits that modified the same lines.
 */
export function registerFindCulpritTool(server: McpServer): void {
  server.tool(
    'find_culprit',
    'Phase 2/4: Given a fix commit, identifies candidate commits that likely introduced the regression by finding earlier commits that touched the same files and similar code regions.',
    InputSchema.shape,
    async ({ fixCommit, searchDepth }) => {
      const depth = searchDepth ?? 50;

      // Step 1: Get the files changed in the fix commit
      const fixFiles = await execGit(['diff-tree', '--no-commit-id', '--name-only', '-r', fixCommit]);
      const files = fixFiles.trim().split('\n').filter(Boolean);

      if (files.length === 0) {
        return { content: [{ type: 'text' as const, text: 'No files changed in the fix commit.' }] };
      }

      // Step 2: Get the fix commit's date to search before it
      const fixDate = await execGit(['show', '--no-patch', '--format=%ai', fixCommit]);
      const fixSubject = await execGit(['show', '--no-patch', '--format=%s', fixCommit]);

      // Step 3: For each file in the fix, find recent commits that touched it before the fix
      const candidateMap = new Map<string, { hash: string; date: string; subject: string; files: string[]; score: number }>();

      for (const file of files) {
        const logOutput = await execGit([
          'log', `--max-count=${depth}`, '--format=%H|%ai|%s',
          `${fixCommit}~1`, '--', file,
        ]);

        const logLines = logOutput.trim().split('\n').filter(Boolean);
        for (const line of logLines) {
          const [hash, date, ...msgParts] = line.split('|');
          const subject = msgParts.join('|');

          if (hash === fixCommit) continue; // skip the fix itself

          const existing = candidateMap.get(hash);
          if (existing) {
            existing.files.push(file);
            existing.score += 1;
          } else {
            candidateMap.set(hash, { hash, date: date.slice(0, 10), subject, files: [file], score: 1 });
          }
        }
      }

      // Step 4: Sort by score (number of overlapping files), then by recency
      const candidates = [...candidateMap.values()]
        .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date))
        .slice(0, 15);

      // Step 5: Format output
      const result = [
        `## Culprit search for fix: \`${fixCommit}\``,
        `**Fix subject:** ${fixSubject.trim()}`,
        `**Fix date:** ${fixDate.trim().slice(0, 10)}`,
        `**Files in fix:** ${files.length}`,
        files.map(f => `  - ${f}`).join('\n'),
        '',
        `### Top ${candidates.length} suspect commits (ranked by file overlap)`,
        '',
        ...candidates.map((c, i) => {
          const overlapPct = Math.round((c.files.length / files.length) * 100);
          return [
            `**${i + 1}. \`${c.hash}\`** — ${c.subject}`,
            `   Date: ${c.date} | Overlap: ${c.files.length}/${files.length} files (${overlapPct}%)`,
            `   Matching files: ${c.files.map(f => f.split('/').pop()).join(', ')}`,
          ].join('\n');
        }),
        '',
        '### Next steps',
        '- Use `get_commit_details` on the top suspects to inspect their diffs.',
        '- Use `prepare_regression_test` with the suspect SHAs to generate a validation plan, then dispatch parallel sub-agents and call `analyze_regression_results`.',
      ].join('\n');

      return { content: [{ type: 'text' as const, text: result }] };
    },
  );
}
