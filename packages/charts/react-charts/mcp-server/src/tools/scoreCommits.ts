import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CommitMeta {
  sha: string;
  message: string;
  date: string;
}

// ─── GitHub API Helpers ───────────────────────────────────────────────────────

function githubHeaders(githubToken: string | undefined): Record<string, string> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (githubToken) headers['Authorization'] = `Bearer ${githubToken}`;
  return headers;
}

async function fetchCommitsForFile(
  repo: string,
  filePath: string,
  githubToken: string | undefined,
): Promise<CommitMeta[]> {
  const url = `https://api.github.com/repos/${repo}/commits?path=${encodeURIComponent(filePath)}&per_page=200`;
  const response = await fetch(url, { headers: githubHeaders(githubToken) });
  if (!response.ok) throw new Error(`GitHub API error fetching commits for ${filePath}: ${response.statusText}`);

  const data = (await response.json()) as Array<{
    sha: string;
    commit: { message: string; author: { date: string } };
  }>;

  return data.map(c => ({
    sha: c.sha,
    message: c.commit.message.split('\n')[0],
    date: c.commit.author.date.slice(0, 10),
  }));
}

/**
 * Fetches the full diff for a commit and filters it down to only the hunks
 * that touch files in scope_filter. This avoids wasting tokens on changelogs,
 * snapshots, and unrelated files — and eliminates truncation of the relevant hunk.
 */
async function fetchScopedDiff(
  repo: string,
  sha: string,
  scopeFilter: string[],
  githubToken: string | undefined,
): Promise<string> {
  const url = `https://api.github.com/repos/${repo}/commits/${sha}`;
  const headers = { ...githubHeaders(githubToken), Accept: 'application/vnd.github.diff' };
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`GitHub API error fetching diff for ${sha}: ${response.statusText}`);

  const fullDiff = await response.text();

  // Split into per-file sections on "diff --git " boundaries
  const fileSections = fullDiff.split(/(?=^diff --git )/m);

  // Keep only sections where any scoped file path appears in the header line
  const relevant = fileSections.filter(section =>
    scopeFilter.some(f => section.startsWith(`diff --git`) && section.includes(f)),
  );

  if (relevant.length === 0) {
    // No scoped-file hunk found — return a trimmed slice of the full diff as fallback
    return fullDiff.length > 3000
      ? fullDiff.slice(0, 3000) + '\n... [diff truncated — no scoped hunk found]'
      : fullDiff;
  }

  return relevant.join('\n');
}

// ─── Recency Score (computed from commit dates, no LLM needed) ───────────────

/**
 * Normalizes commit dates to a 0–1 recency score.
 * Newest commit → 1.0, oldest → 0.0. Single commit → 0.5.
 */
function computeRecencyScores(commits: CommitMeta[]): Map<string, number> {
  const timestamps = commits.map(c => new Date(c.date).getTime());
  const min = Math.min(...timestamps);
  const max = Math.max(...timestamps);
  const range = max - min;

  return new Map(commits.map(c => [c.sha, range === 0 ? 0.5 : (new Date(c.date).getTime() - min) / range]));
}

// ─── Register MCP Tool ────────────────────────────────────────────────────────

export function registerScoreCommitsTool(server: McpServer): void {
  server.tool(
    'fetch_commits_for_regression',
    'Fetches all commits from GitHub for a set of files, retrieves their diffs, and returns them for the LLM to score each commit and identify the top 5 culprit candidates.',
    {
      description: z.string(),
      repo: z.string(),
      scope_filter: z.array(z.string()),
    } as any,
    async (args: any) => {
      const description: string = args.description;
      const repo: string = args.repo;
      const scope_filter: string[] = args.scope_filter;

      const github_token = process.env['GITHUB_TOKEN'] || undefined;

      // Step 1: Fetch commit metadata (one API call per file, parallel)
      const commitsByFile = await Promise.all(scope_filter.map(file => fetchCommitsForFile(repo, file, github_token)));

      // Deduplicate by sha
      const seen = new Set<string>();
      const uniqueCommits = commitsByFile.flat().filter(c => {
        if (seen.has(c.sha)) return false;
        seen.add(c.sha);
        return true;
      });

      if (uniqueCommits.length === 0) {
        return { content: [{ type: 'text' as const, text: 'No commits found for the given files.' }] };
      }

      // Step 2: Compute recency scores (0–1) from dates across ALL unique commits for fair normalisation
      const recencyMap = computeRecencyScores(uniqueCommits);

      // Step 3: Fetch scoped diffs for ALL commits (parallel)
      const withDiffs = await Promise.all(
        uniqueCommits.map(async c => ({
          ...c,
          recency: recencyMap.get(c.sha) ?? 0.5,
          diff: await fetchScopedDiff(repo, c.sha, scope_filter, github_token),
        })),
      );

      // Step 4: Return all commits with diffs and scoring formula — LLM scores each and outputs top 5
      const lines: string[] = [
        `## Commit evidence for regression investigation`,
        `**Bug report:** ${description}`,
        `**Repo:** ${repo} | **Files:** ${scope_filter.join(', ')}`,
        '',
        `## Scoring instructions`,
        `For each commit, score these three components then compute the final score:`,
        ``,
        `| Component | Scale | Meaning |`,
        `|-----------|-------|---------|`,
        `| **semantic_relevance** | 0–3 | 0 = unrelated, 1 = loosely related, 2 = directly related concepts, 3 = exact match to bug description |`,
        `| **behavioural_change** | 0–2 | 0 = no runtime change (comments/tests/types only), 1 = minor logic change, 2 = significant change to relevant runtime behaviour |`,
        `| **risk_pattern** | 0–2 | 0 = safe refactor, 1 = some new conditions or code paths, 2 = asymmetric handling, missing prop, or incomplete feature port |`,
        ``,
        `**recency** is pre-computed below per commit (0 = oldest in set, 1 = newest).`,
        ``,
        `**Formula:** \`score = (semantic_relevance × 3 + behavioural_change × 2 + risk_pattern × 1 + recency × 1) / 16 × 10\``,
        `**Max raw = 16, normalised to 0–10.**`,
        ``,
        `Rules:`,
        `- A commit that explicitly FIXES the described bug scores 0 regardless of formula.`,
        `- Score every commit. Do NOT stop early.`,
        `- After scoring all commits, output only the top 5 by final score with their component breakdown.`,
        '',
      ];

      for (const c of withDiffs) {
        lines.push(`### ${c.sha.slice(0, 10)} — ${c.message} (${c.date})`);
        lines.push(`**Pre-computed recency:** ${c.recency.toFixed(2)}`);
        lines.push('```diff');
        lines.push(c.diff);
        lines.push('```');
        lines.push('');
      }

      return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
    },
  );
}
