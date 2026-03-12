import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { CreateMessageResultSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Commit {
  sha: string;
  message: string;
  date: string;
}

interface ScoredCommit extends Commit {
  score: number;
  reason: string;
}

// ─── GitHub API Helpers ───────────────────────────────────────────────────────

function githubHeaders(githubToken: string | undefined): Record<string, string> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (githubToken) headers['Authorization'] = `Bearer ${githubToken}`;
  return headers;
}

async function fetchCommitsForFile(repo: string, filePath: string, githubToken: string | undefined): Promise<Commit[]> {
  const url = `https://api.github.com/repos/${repo}/commits?path=${encodeURIComponent(filePath)}&per_page=2`;
  const response = await fetch(url, { headers: githubHeaders(githubToken) });

  if (!response.ok) {
    throw new Error(`GitHub API error fetching commits for ${filePath}: ${response.statusText}`);
  }

  const data = (await response.json()) as Array<{
    sha: string;
    commit: { message: string; author: { date: string } };
  }>;

  return data.map(c => ({
    sha: c.sha,
    message: c.commit.message,
    date: c.commit.author.date,
  }));
}

async function fetchCommitDiff(repo: string, sha: string, githubToken: string | undefined): Promise<string> {
  const url = `https://api.github.com/repos/${repo}/commits/${sha}`;
  const headers = { ...githubHeaders(githubToken), Accept: 'application/vnd.github.diff' };
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error fetching diff for ${sha}: ${response.statusText}`);
  }

  return response.text();
}

// ─── Sampling-based Scoring ───────────────────────────────────────────────────

// Scores a commit diff against the bug description using the host LLM via MCP sampling.
// No API key required — uses whatever LLM is running the MCP client (Claude, Copilot, etc.)
async function scoreCommitViaSampling(
  description: string,
  diff: string,
  commitDate: string,
  rawServer: Server,
): Promise<{ score: number; reason: string }> {
  const daysSinceCommit = (Date.now() - new Date(commitDate).getTime()) / (1000 * 60 * 60 * 24);
  const recency = daysSinceCommit <= 3 ? 1 : 0;

  const prompt = `You are an expert code reviewer debugging a regression.

Bug report: "${description}"

Commit diff:
${diff.slice(0, 4000)}

Score this commit on these signals. Reply ONLY as JSON with no extra text:
{
  "semantic_relevance": <0-3>,
  "behavioral_change": <0-2>,
  "risk_pattern": <0-2>,
  "reason": "<one sentence>"
}

Scoring guide:
- semantic_relevance (0-3): Does this diff logically relate to the regression?
  0 = unrelated, 1 = loosely related, 2 = likely related, 3 = almost certain
- behavioral_change (0-2): Does it change control flow, state, or side effects?
  0 = cosmetic only, 1 = minor logic change, 2 = significant behavior change
- risk_pattern (0-2): Does it match known regression patterns?
  0 = none, 1 = partial match, 2 = classic pattern`;

  const result = await rawServer.request(
    {
      method: 'sampling/createMessage',
      params: {
        messages: [{ role: 'user', content: { type: 'text', text: prompt } }],
        maxTokens: 256,
      },
    },
    CreateMessageResultSchema,
  );

  const llmText = result.content.type === 'text' ? result.content.text : '{}';
  // Strip markdown code fences if the LLM wraps the response in ```json ... ```
  const text = llmText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
  const parsed = JSON.parse(text) as {
    semantic_relevance: number;
    behavioral_change: number;
    risk_pattern: number;
    reason: string;
  };

  // Weighted formula: max = 8, normalize to 0-10
  const raw = parsed.semantic_relevance * 3 + parsed.behavioral_change * 2 + parsed.risk_pattern * 2 + recency * 1;
  const score = Math.round((raw / 8) * 10);

  return { score, reason: parsed.reason };
}

// ─── Register MCP Tool ────────────────────────────────────────────────────────

const inputSchema = {
  description: z.string().describe('A plain-language description of the bug or regression to investigate'),
  repo: z.string().describe('GitHub repository in owner/repo format, e.g. "microsoft/fluentui"'),
  scope_filter: z.array(z.string()).describe('List of file paths to scope the commit search to'),
};

export function registerScoreCommitsTool(server: McpServer): void {
  // Access the underlying Server instance for sampling requests
  const rawServer = (server as unknown as { server: Server }).server;

  // Cast to avoid TS2589: MCP SDK's Zod overload creates type instantiation too deep for the compiler to resolve
  const tool = server.tool.bind(server) as (
    name: string,
    description: string,
    schema: typeof inputSchema,
    handler: (args: { description: string; repo: string; scope_filter: string[] }) => Promise<unknown>,
  ) => void;

  tool(
    'fetch_commits_for_regression',
    'Fetches up to 2 recent commits for a set of files, scores each diff against the bug description using the host LLM (via MCP sampling), and returns only commits scoring 8 or above.',
    inputSchema,
    async ({ description, repo, scope_filter }) => {
      const github_token = process.env['GITHUB_TOKEN'] || undefined;

      // Step 1: Fetch commits for all files in parallel
      const commitsByFile = await Promise.all(
        scope_filter.map((file: string) => fetchCommitsForFile(repo, file, github_token)),
      );

      // Flatten and deduplicate by sha
      const seen = new Set<string>();
      const uniqueCommits = commitsByFile.flat().filter(c => {
        if (seen.has(c.sha)) return false;
        seen.add(c.sha);
        return true;
      });

      if (uniqueCommits.length === 0) {
        return {
          content: [{ type: 'text' as const, text: 'No commits found for the given files.' }],
        };
      }

      // Step 2: Fetch diff + score each commit using MCP sampling
      const scoredCommits: ScoredCommit[] = await Promise.all(
        uniqueCommits.map(async (commit): Promise<ScoredCommit> => {
          const diff = await fetchCommitDiff(repo, commit.sha, github_token);
          const { score, reason } = await scoreCommitViaSampling(description, diff, commit.date, rawServer);
          return { ...commit, score, reason };
        }),
      );

      // Step 3: Sort descending by score
      const suspects = scoredCommits.sort((a, b) => b.score - a.score);

      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ suspects }, null, 2) }],
      };
    },
  );
}
