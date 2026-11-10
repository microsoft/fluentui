// @ts-check

const { createHash } = require('node:crypto');
const { setTimeout } = require('node:timers/promises');

/**
 * @typedef {{
 *   head: { sha: string };
 *   base: { sha: string; ref: string; repo: { full_name: string } };
 *   title: string;
 *   body: string | null;
 * }} PullSnapshot
 */

/** @param {PullSnapshot} pull */
function revisionKey(pull) {
  return createHash('sha256')
    .update(
      JSON.stringify([pull.head.sha, pull.base.sha, pull.base.ref, pull.base.repo.full_name, pull.title, pull.body]),
    )
    .digest('hex');
}

/**
 * @param {{
 *   github: ReturnType<typeof import('@actions/github').getOctokit>;
 *   context: typeof import('@actions/github').context;
 *   trustedBaseSha: string;
 *   wait?: () => Promise<unknown>;
 * }} args
 */
async function waitForAssessment({ github, context, trustedBaseSha, wait = () => setTimeout(5_000) }) {
  const params = { ...context.repo, pull_number: context.issue.number };
  const { data: pull } = await github.rest.pulls.get(params);
  if (pull.head.sha !== context.payload.pull_request?.head.sha || pull.base.sha !== trustedBaseSha) {
    throw new Error('The gate no longer matches the current PR head/base. Start a fresh attempt.');
  }
  const identity = revisionKey(pull);
  for (let attempt = 0; attempt < 30; attempt++) {
    const { data: current } = await github.rest.pulls.get(params);
    if (revisionKey(current) !== identity) {
      throw new Error('PR metadata changed while waiting for assessment. A fresh gate is required.');
    }
    const checks = await github.paginate(github.rest.checks.listForRef, {
      ...context.repo,
      ref: pull.head.sha,
      check_name: 'PR risk assessment',
      filter: 'all',
      per_page: 100,
    });
    const check = checks
      .filter(candidate => candidate.app?.slug === 'github-actions' && candidate.external_id === identity)
      .sort((a, b) => b.id - a.id)[0];
    if (check?.status === 'completed') {
      if (check.conclusion !== 'success') {
        throw new Error('The current PR risk assessment failed. Fix or rerun the trusted assessment.');
      }
      return;
    }
    await wait();
  }
  throw new Error('No successful risk assessment for the current PR revision arrived before the gate deadline.');
}

module.exports = { revisionKey, waitForAssessment };
