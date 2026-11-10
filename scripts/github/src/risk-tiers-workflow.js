// @ts-check

const { decideRisk, getDecisionToken } = require('./risk-decision');
const { classifyRisk, hasReviewFocus, tierLabels } = require('./risk-tiers');

/**
 * @param {{
 *   github: ReturnType<typeof import('@actions/github').getOctokit>,
 *   context: typeof import('@actions/github').context,
 *   core: typeof import('@actions/core'),
 *   checkRun?: { id: number; headSha: string; baseSha: string; baseRef: string; baseRepo: string },
 *   assessRisk?: (input: Parameters<typeof decideRisk>[0]) => ReturnType<typeof decideRisk>
 * }} args
 */
module.exports = async ({
  github,
  context,
  core,
  checkRun,
  assessRisk = input =>
    decideRisk(input, {
      getToken: () => getDecisionToken(core),
    }),
}) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const pullNumber = context.issue.number;
  const params = { owner, repo, pull_number: pullNumber };
  const { data: pull } = await github.rest.pulls.get(params);
  const check =
    checkRun ||
    (
      await github.rest.checks.create({
        owner,
        repo,
        name: 'PR risk policy',
        head_sha: pull.head.sha,
        status: 'in_progress',
      })
    ).data;
  try {
    if (
      checkRun &&
      (!Number.isSafeInteger(checkRun.id) ||
        checkRun.id <= 0 ||
        pull.head.sha !== checkRun.headSha ||
        pull.base.sha !== checkRun.baseSha ||
        pull.base.ref !== checkRun.baseRef ||
        pull.base.repo.full_name !== checkRun.baseRepo)
    ) {
      throw new Error('The PR no longer matches the trusted workflow revision. Trigger a fresh classification.');
    }
    if (!pull.user) {
      throw new Error('The pull request author is unavailable. No tier is certified.');
    }
    const files = await github.paginate(github.rest.pulls.listFiles, { ...params, per_page: 100 });
    if (files.length !== pull.changed_files || files.length >= 3000) {
      throw new Error('The complete diff is unavailable (GitHub limits file listings to 3,000). No tier is certified.');
    }
    const deterministic = classifyRisk(files, { author: pull.user.login, title: pull.title });
    let result = deterministic;
    let modelSummary = 'Decision not called: the deterministic evaluator already requires tier 3.';
    if (deterministic.tier < 3) {
      const { data: diff } = await github.rest.pulls.get({ ...params, mediaType: { format: 'diff' } });
      if (typeof diff !== 'string') {
        throw new Error('GitHub did not return the full PR diff. No model tier is certified.');
      }
      const decision = await assessRisk({ diff, deterministic, title: pull.title });
      const missingPatchFloor = files.some(file => !file.patch && file.status !== 'renamed') ? 2 : 0;
      result = {
        tier: Math.max(deterministic.tier, decision.tier, missingPatchFloor),
        reason: deterministic.reason,
      };
      modelSummary =
        `Decision suggested tier ${decision.tier}; deterministic floor ${deterministic.tier}; ` +
        `unavailable-patch floor ${missingPatchFloor}; final tier ${result.tier}. ` +
        `Model ${decision.model}, confidence ${decision.confidence} (uncalibrated), ` +
        `tokens ${decision.inputTokens} input / ${decision.outputTokens} output.`;
    }
    const focusPresent = result.tier < 2 || hasReviewFocus(pull.body);
    const { data: current } = await github.rest.pulls.get(params);
    if (
      current.head.sha !== pull.head.sha ||
      current.base.sha !== pull.base.sha ||
      current.base.ref !== pull.base.ref ||
      current.base.repo.full_name !== pull.base.repo.full_name ||
      current.title !== pull.title ||
      current.body !== pull.body
    ) {
      throw new Error('The pull request changed during classification. Rerun against the latest revision.');
    }

    const label = tierLabels[result.tier];
    // Add first: a partial API failure must not remove the previous high-risk warning.
    await github.rest.issues.addLabels({ owner, repo, issue_number: pullNumber, labels: [label] });
    for (const existing of current.labels) {
      if (existing.name && tierLabels.includes(existing.name) && existing.name !== label) {
        await github.rest.issues.removeLabel({ owner, repo, issue_number: pullNumber, name: existing.name });
      }
    }

    const conclusion = focusPresent ? 'success' : 'failure';
    const summary = [
      `Tier ${result.tier} - ${label}.`,
      `Deterministic evaluator: ${deterministic.reason}`,
      modelSummary,
      'Pilot: human approval remains required for every tier. Labels never authorize a merge or skip CI.',
      result.tier === 3 ? 'AI may comment but must not approve tier 3 changes.' : '',
      focusPresent ? '' : 'Add a nonempty `Review focus: ...` line to the PR description for tier 2 or 3.',
    ]
      .filter(Boolean)
      .join('\n\n');
    await github.rest.checks.update({
      owner,
      repo,
      check_run_id: check.id,
      status: 'completed',
      conclusion,
      output: { title: `Tier ${result.tier}: ${focusPresent ? 'policy satisfied' : 'review focus required'}`, summary },
    });
    await core.summary.addRaw(summary).write();
    if (!focusPresent) {
      core.setFailed('Tier 2 and 3 pull requests require a Review focus line.');
    }
  } catch (error) {
    await github.rest.checks.update({
      owner,
      repo,
      check_run_id: check.id,
      status: 'completed',
      conclusion: 'failure',
      output: {
        title: 'Risk classification failed',
        summary: 'No tier is certified. Inspect the failed housekeeping workflow and rerun it before merging.',
      },
    });
    throw error;
  }
};
