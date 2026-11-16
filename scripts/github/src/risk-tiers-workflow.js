// @ts-check

const { createHash } = require('node:crypto');

const { askRiskModel, getRiskModelConfig, getRiskModelToken } = require('./risk-model');
const { classifyRisk, hasReviewFocus, tierLabels } = require('./risk-tiers');

const aiReviewLabel = 'ai-review';
// The legacy permission field maps `maintain` to `write` and `triage` to `read`.
const trustedPermissions = ['admin', 'write'];
// Used only when the permission lookup fails: `author_association` is unreliable (private org members may show as
// CONTRIBUTOR) and `MEMBER` means any member of the organization.
const trustedAssociations = ['OWNER', 'MEMBER', 'COLLABORATOR'];

/** @typedef {import('./risk-tiers').Tier} Tier */
/** @typedef {(input: Parameters<typeof askRiskModel>[0]) => ReturnType<typeof askRiskModel>} AssessRisk */
/** @typedef {{ trusted: boolean; note?: string }} AuthorTrust */

/**
 * Everything the published result depends on besides the file list: a change to any of these during
 * classification means the result would describe a revision that no longer exists.
 *
 * @param {{ head: { sha: string }; base: { sha: string; ref: string; repo: { full_name: string } }; body: string | null }} pull
 */
function revisionKey(pull) {
  return createHash('sha256')
    .update(JSON.stringify([pull.head.sha, pull.base.sha, pull.base.ref, pull.base.repo.full_name, pull.body]))
    .digest('hex');
}

/**
 * Whether the author may get the model without a maintainer's `ai-review` label: write access to the repository.
 *
 * @param {ReturnType<typeof import('@actions/github').getOctokit>} github
 * @param {{ owner: string; repo: string }} repository
 * @param {{ user: { login: string } | null; author_association: string }} pull
 * @returns {Promise<AuthorTrust>}
 */
async function authorTrust(github, repository, pull) {
  if (!pull.user) {
    return { trusted: false };
  }
  try {
    const { data } = await github.rest.repos.getCollaboratorPermissionLevel({
      ...repository,
      username: pull.user.login,
    });
    return { trusted: trustedPermissions.includes(data.permission) };
  } catch (error) {
    if (/** @type {{ status?: number }} */ (error).status === 404) {
      return { trusted: false };
    }
    return {
      trusted: trustedAssociations.includes(pull.author_association),
      note: 'Author permission could not be verified, so the author association was used.',
    };
  }
}

/**
 * @param {{ getIDToken: (audience: string) => Promise<string> }} core
 * @param {NodeJS.ProcessEnv} env
 * @returns {AssessRisk | undefined} The model call, or undefined when no model is configured.
 */
function configuredModel(core, env) {
  let config;
  try {
    config = getRiskModelConfig(env);
  } catch (error) {
    // A broken configuration must be visible, so it fails every call instead of disabling the model.
    return () => Promise.reject(error);
  }
  return (
    config &&
    (input =>
      askRiskModel(input, {
        endpoint: config.endpoint,
        deployment: config.deployment,
        model: config.model,
        getToken: () => getRiskModelToken(core, config),
      }))
  );
}

/**
 * Asks the model whether the deterministic tier should be higher. The model never lowers a tier and never prevents a
 * label. In shadow mode (the default) its suggestion is only reported and the deterministic tier stands. In raise
 * mode its suggestion applies, and a fast-lane tier (0 or 1) needs a model assessment: when the model is not
 * configured, not allowed to run (an author without write access and no `ai-review` label), or fails, the tier is
 * at least 2.
 *
 * @param {{
 *   pull: { labels: { name?: string }[] };
 *   deterministic: { tier: Tier; reason: string };
 *   getTrust: () => Promise<AuthorTrust>;
 *   getDiff: () => Promise<unknown>;
 *   assessRisk: AssessRisk | undefined;
 *   raise: boolean;
 * }} args
 * @returns {Promise<{ tier: number; summary: string; modelTier?: number; confidence?: number }>}
 */
async function escalate({ pull, deterministic, getTrust, getDiff, assessRisk, raise }) {
  const floor = deterministic.tier;
  /** @param {string} why */
  const unassessed = why =>
    raise
      ? {
          tier: Math.max(floor, 2),
          summary: `${why} A fast-lane tier needs a model assessment, so the tier is at least 2.`,
        }
      : { tier: floor, summary: `${why} The deterministic tier stands.` };
  if (floor === 3) {
    return { tier: floor, summary: 'Model not called: the deterministic tier is already 3.' };
  }
  if (!assessRisk) {
    return unassessed('Model not configured.');
  }
  const labeled = pull.labels.some(label => label.name === aiReviewLabel);
  const trust = labeled ? { trusted: true } : await getTrust();
  const note = trust.note ? `${trust.note} ` : '';
  if (!trust.trusted) {
    return unassessed(
      `${note}Model not called: the author has no write access. A maintainer can add the \`${aiReviewLabel}\` ` +
        'label and rerun.',
    );
  }
  try {
    const diff = await getDiff();
    if (typeof diff !== 'string') {
      throw new Error('GitHub did not return the PR diff.');
    }
    const answer = await assessRisk({ diff, deterministic });
    const suggested = Math.max(floor, answer.tier);
    const details =
      `${note}Model suggested tier ${answer.tier}. Model ${answer.model}, confidence ${answer.confidence} ` +
      `(uncalibrated), tokens ${answer.inputTokens} input / ${answer.outputTokens} output.`;
    const measured = { modelTier: answer.tier, confidence: answer.confidence };
    return raise
      ? { tier: suggested, summary: details, ...measured }
      : {
          tier: floor,
          summary: `Shadow mode, not applied: with the model this would be tier ${suggested}. ${details}`,
          ...measured,
        };
  } catch (error) {
    return unassessed(
      `Model could not assess the change (${error instanceof Error ? error.message : 'unknown error'}).`,
    );
  }
}

/**
 * Classifies one pull request revision and publishes exactly one risk label and the `PR risk assessment` check.
 * Runs base-branch code only: it reads the PR through the API and never checks out or executes PR code.
 * `checkRun` is the check the workflow created for `headSha` before checking out; it is completed exactly once.
 *
 * @param {{
 *   github: ReturnType<typeof import('@actions/github').getOctokit>,
 *   context: typeof import('@actions/github').context,
 *   core: typeof import('@actions/core'),
 *   checkRun: { id: number; headSha: string },
 *   env?: NodeJS.ProcessEnv,
 *   assessRisk?: AssessRisk
 * }} args Set `env.RISK_MODEL_MODE` to `raise` to let the model change labels; anything else is shadow mode.
 */
module.exports = async ({
  github,
  context,
  core,
  checkRun,
  env = process.env,
  assessRisk = configuredModel(core, env),
}) => {
  const { owner, repo } = context.repo;
  const issueNumber = context.issue.number;
  const params = { owner, repo, pull_number: issueNumber };
  try {
    const { data: pull } = await github.rest.pulls.get(params);
    if (!Number.isSafeInteger(checkRun.id) || checkRun.id <= 0 || pull.head.sha !== checkRun.headSha) {
      throw new Error('The PR head changed since this run started. The run for the new head classifies it.');
    }
    const identity = revisionKey(pull);

    const raise = env.RISK_MODEL_MODE === 'raise';
    const files = await github.paginate(github.rest.pulls.listFiles, { ...params, per_page: 100 });
    const deterministic = classifyRisk(files, { changedFiles: pull.changed_files });
    const model = await escalate({
      pull,
      deterministic,
      getTrust: () => authorTrust(github, { owner, repo }, pull),
      getDiff: async () => (await github.rest.pulls.get({ ...params, mediaType: { format: 'diff' } })).data,
      assessRisk,
      raise,
    });
    const tier = model.tier;
    const focusPresent = tier < 2 || hasReviewFocus(pull.body);

    const { data: current } = await github.rest.pulls.get(params);
    if (revisionKey(current) !== identity) {
      throw new Error('The pull request changed during classification. Rerun against the latest revision.');
    }

    const label = tierLabels[tier];
    // Add first: a partial API failure must not remove the previous high-risk warning.
    await github.rest.issues.addLabels({ owner, repo, issue_number: issueNumber, labels: [label] });
    for (const existing of current.labels) {
      if (existing.name && tierLabels.includes(existing.name) && existing.name !== label) {
        await github.rest.issues.removeLabel({ owner, repo, issue_number: issueNumber, name: existing.name });
      }
    }

    const summary = [
      `Tier ${tier} - ${label}.`,
      `Deterministic: tier ${deterministic.tier}. ${deterministic.reason}`,
      model.summary,
      'Pilot: human approval remains required for every tier. Labels never authorize a merge or skip CI.',
      tier === 3 ? 'AI may comment but must not approve tier 3 changes.' : '',
      focusPresent ? '' : 'Reminder: add a nonempty `Review focus: ...` line to the PR description for tier 2 or 3.',
    ]
      .filter(Boolean)
      .join('\n\n');
    await github.rest.checks.update({
      owner,
      repo,
      check_run_id: checkRun.id,
      status: 'completed',
      // Label-only pilot: a missing Review focus line is a reminder, never a failure.
      conclusion: 'success',
      output: {
        title: `Tier ${tier}: ${focusPresent ? 'policy satisfied' : 'add a review focus line'}`,
        summary,
        // One machine-readable record per assessment, for measuring the pilot from the Checks API.
        text: JSON.stringify({
          tier,
          deterministicTier: deterministic.tier,
          modelTier: model.modelTier ?? null,
          modelConfidence: model.confidence ?? null,
          mode: raise ? 'raise' : 'shadow',
          reviewFocus: focusPresent,
        }),
      },
    });
    core.setOutput('check-completed', 'true');
    await core.summary.addRaw(summary).write();
  } catch (error) {
    await github.rest.checks.update({
      owner,
      repo,
      check_run_id: checkRun.id,
      status: 'completed',
      conclusion: 'failure',
      output: {
        title: 'Risk classification failed',
        summary: 'No tier is certified. Inspect the failed housekeeping workflow and rerun it before merging.',
      },
    });
    // The check now explains the failure; the workflow finalizer must not replace it with a generic message.
    core.setOutput('check-completed', 'true');
    throw error;
  }
};

module.exports.escalate = escalate;
