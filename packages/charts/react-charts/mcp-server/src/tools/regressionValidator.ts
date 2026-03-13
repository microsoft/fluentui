import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { execGit, getRepoRoot, worktreeBasePath } from '../utils/git.js';

// ── Tool 1: prepare_regression_test ──────────────────────────────────────────

export function registerPrepareRegressionTestTool(server: McpServer): void {
  server.tool(
    'prepare_regression_test',
      'Phase 3 — Step 1: Prepares a regression validation plan. ' +
      'Takes suspect commit SHAs from Phase 2 and returns the exact shell commands ' +
      'needed to test each commit in an isolated git worktree. ' +
      'You (the LLM) should then spawn parallel sub-agents to execute each suspect\'s commands, ' +
      'collect pass/fail results, and call `analyze_regression_results` to identify the guilty commit. ' +
      'IMPORTANT: If testCommand is not provided, you MUST first generate a minimal test script ' +
      'based on the bug description. The test must exit 0 when the bug is absent and non-zero when present. ' +
      'Write the script to a temp file in each worktree (e.g., `regression-test.js`) before running it. ' +
      'The test should NOT rely on any test that was added as part of the fix — it must work against ' +
      'older commits where the fix does not exist.',
    {
      commits: z.array(z.string()),
      testCommand: z.string().optional(),
      packageName: z.string(),
      repoRoot: z.string().optional(),
    } as any,
    async (args: any) => {
      const commits: string[] = args.commits;
      const testCommand: string | undefined = args.testCommand;
      const packageName: string = args.packageName;
      const repoRootParam: string | undefined = args.repoRoot;

      const repoRoot = repoRootParam || getRepoRoot();

      if (commits.length === 0) {
        return { content: [{ type: 'text' as const, text: 'Error: No commits provided.' }] };
      }

      // Resolve short SHAs to full SHAs
      const resolved: Array<{ input: string; sha: string; error?: string }> = [];
      for (const input of commits) {
        try {
          const sha = (await execGit(['rev-parse', input])).trim();
          resolved.push({ input, sha });
        } catch {
          resolved.push({ input, sha: input, error: `Could not resolve "${input}" — not a valid commit in this repo.` });
        }
      }

      const errors = resolved.filter(r => r.error);
      if (errors.length === resolved.length) {
        return { content: [{ type: 'text' as const, text: `Error: None of the commits could be resolved:\n${errors.map(e => `- ${e.error}`).join('\n')}` }] };
      }

      const baseDir = worktreeBasePath(repoRoot);
      const validSuspects = resolved.filter(r => !r.error);

      // Build the plan
      const suspects = validSuspects.map(({ sha }) => {
        const short = sha.slice(0, 7);
        const dir = `${baseDir}/suspect-${short}`;
        return { sha, shortSha: short, worktreeDir: dir };
      });

      const hasTestCommand = testCommand && testCommand.trim().length > 0;

      const plan = [
        `## Regression Validation Plan`,
        '',
        `**Repo root:** \`${repoRoot}\``,
        `**Worktree base:** \`${baseDir}\``,
        `**Package:** ${packageName}`,
        `**Test command:** ${hasTestCommand ? `\`${testCommand}\`` : '⚠️ Not provided — see "Generate test script" section below.'}`,
        `**Suspects:** ${suspects.length}`,
        '',
        errors.length > 0 ? `### Warnings\n${errors.map(e => `- ${e.error}`).join('\n')}\n` : '',
        !hasTestCommand ? [
          `### Generate test script (REQUIRED — no testCommand provided)`,
          `Before running the steps below, you must create a regression test script based on the bug description.`,
          `Requirements:`,
          `- The script must exit 0 if the bug is **absent** (correct behavior) and non-zero if the bug is **present**`,
          `- Do NOT use any test that was added as part of the fix commit — it won't exist on older suspects`,
          `- Write the script once, then copy it into each worktree before running`,
          `- Example approach: write a \`regression-test.js\` that uses jsdom/React testing utilities to render the component and assert the expected behavior`,
          `- For each worktree, the sub-agent should write the script to \`<worktreeDir>/regression-test.js\` and run \`node regression-test.js\``,
          '',
        ].join('\n') : '',
        `### Step 1: Create worktree base directory`,
        '```bash',
        `mkdir -p "${baseDir}"`,
        '```',
        '',
        `### Step 2: Create worktrees (run SEQUENTIALLY to avoid git lock conflicts)`,
        ...suspects.map(s => [
          '```bash',
          `git worktree add "${s.worktreeDir}" ${s.sha}`,
          '```',
        ].join('\n')),
        '',
        `### Step 3: Test each suspect (run as PARALLEL sub-agents)`,
        `For each suspect, spawn a sub-agent that runs these commands in the worktree directory:`,
        '',
        ...suspects.map(s => [
          `#### Suspect \`${s.shortSha}\` (${s.sha})`,
          `Working directory: \`${s.worktreeDir}\``,
          '```bash',
          `# 1. Install dependencies`,
          `cd "${s.worktreeDir}" && yarn --frozen-lockfile`,
          `# 2. Build the package`,
          `cd "${s.worktreeDir}" && yarn nx run ${packageName}:build`,
          `# 3. Run regression test`,
          `cd "${s.worktreeDir}" && ${hasTestCommand ? testCommand : '<YOUR_GENERATED_TEST_COMMAND>'}`,
          '```',
          `Report result as: { sha: "${s.sha}", status: "pass" | "fail" | "error" }`,
          '',
        ].join('\n')),
        `### Step 4: Collect results and analyze`,
        `After all sub-agents complete, call \`analyze_regression_results\` with the collected results array.`,
        '',
        `### Step 5: Cleanup (ALWAYS run this, even if tests fail)`,
        '```bash',
        ...suspects.map(s => `git worktree remove --force "${s.worktreeDir}"`),
        `rm -rf "${baseDir}"`,
        '```',
      ].filter(Boolean).join('\n');

      return { content: [{ type: 'text' as const, text: plan }] };
    },
  );
}

// ── Tool 2: analyze_regression_results ───────────────────────────────────────

export function registerAnalyzeRegressionResultsTool(server: McpServer): void {
  server.tool(
    'analyze_regression_results',
    'Phase 3 — Step 2: Analyzes the pass/fail results from sub-agent test runs. ' +
      'Finds the PASS→FAIL transition to identify the guilty commit. ' +
      'Call this after all parallel sub-agents have reported their results.',
    {
      results: z.array(z.object({
        sha: z.string(),
        status: z.enum(['pass', 'fail', 'error']),
        error: z.string().optional(),
      })),
    } as any,
    async (args: any) => {
      const results = args.results;

      if (results.length === 0) {
        return { content: [{ type: 'text' as const, text: JSON.stringify({ success: false, error: 'No results provided.' }) }] };
      }

      const passed = results.filter((r: any) => r.status === 'pass').length;
      const failed = results.filter((r: any) => r.status === 'fail').length;
      const errored = results.filter((r: any) => r.status === 'error').length;

      // Find PASS→FAIL transitions (skip "error" results)
      const definitive = results.filter((r: any) => r.status === 'pass' || r.status === 'fail');
      const transitions: Array<{ from: string; to: string; index: number }> = [];

      for (let i = 1; i < definitive.length; i++) {
        if (definitive[i - 1].status === 'pass' && definitive[i].status === 'fail') {
          transitions.push({
            from: definitive[i - 1].sha,
            to: definitive[i].sha,
            index: i,
          });
        }
      }

      const warnings: string[] = [];
      let guiltyCommit: { sha: string; previousPassingCommit: string } | null = null;

      if (transitions.length === 1) {
        guiltyCommit = { sha: transitions[0].to, previousPassingCommit: transitions[0].from };
      } else if (transitions.length > 1) {
        guiltyCommit = { sha: transitions[0].to, previousPassingCommit: transitions[0].from };
        warnings.push(
          `Found ${transitions.length} PASS→FAIL transitions — possible flaky test. Reporting the first transition.`,
        );
      }

      if (passed === 0 && failed > 0) {
        warnings.push('All tests failed — the regression likely predates all suspect commits.');
      }
      if (failed === 0 && passed > 0) {
        warnings.push('All tests passed — the regression is not reproducible in this commit range.');
      }
      if (errored > 0) {
        warnings.push(`${errored} commit(s) had errors (build/install failure) and were excluded from transition analysis.`);
      }

      // Get commit details for the guilty commit if found
      let guiltyDetails = '';
      if (guiltyCommit) {
        try {
          const info = await execGit(['show', '--no-patch', '--format=%H|%ai|%an|%s', guiltyCommit.sha]);
          const [, date, author, subject] = info.trim().split('|');
          guiltyDetails = `\n**Date:** ${date}\n**Author:** ${author}\n**Subject:** ${subject}`;
        } catch {
          // Non-critical, skip
        }
      }

      const output = [
        guiltyCommit
          ? `## Guilty commit found: \`${guiltyCommit.sha}\``
          : `## No guilty commit identified`,
        guiltyDetails,
        '',
        '### Results summary',
        `| Status | Count |`,
        `|--------|-------|`,
        `| Pass   | ${passed} |`,
        `| Fail   | ${failed} |`,
        `| Error  | ${errored} |`,
        `| **Total** | **${results.length}** |`,
        '',
        '### Per-commit results',
        ...results.map((r: any) => {
          const icon = r.status === 'pass' ? 'PASS' : r.status === 'fail' ? 'FAIL' : 'ERROR';
          return `- \`${r.sha.slice(0, 10)}\` — **${icon}**${r.error ? ` (${r.error})` : ''}`;
        }),
        '',
        warnings.length > 0 ? `### Warnings\n${warnings.map(w => `- ${w}`).join('\n')}\n` : '',
        guiltyCommit
          ? [
              '### Next step',
              `Pass the guilty commit \`${guiltyCommit.sha}\` to Phase 4 for root cause analysis and fix suggestion.`,
              `Use \`get_commit_details\` to retrieve the full diff for the explanation phase.`,
            ].join('\n')
          : [
              '### Next step',
              'No clear PASS→FAIL transition found. Consider:',
              '- Expanding the suspect range with more commits from Phase 2',
              '- Checking if the test command reliably reproduces the bug',
              '- Using `get_commit_details` to manually inspect the suspects',
            ].join('\n'),
      ].filter(Boolean).join('\n');

      return { content: [{ type: 'text' as const, text: output }] };
    },
  );
}
