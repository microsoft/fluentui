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
  const workflowPath = '.github/workflows/pr-housekeeping.yml';
  const { data: workflow } = await github.rest.actions.getWorkflow({
    ...context.repo,
    workflow_id: workflowPath,
  });
  if (workflow.path !== workflowPath || workflow.state !== 'active') {
    throw new Error('The trusted risk assessment workflow is unavailable.');
  }
  const runTitle = `PR risk assessment #${context.issue.number}`;
  const jobName = `Assess PR #${context.issue.number} revision ${identity}`;
  for (let attempt = 0; attempt < 30; attempt++) {
    const { data: current } = await github.rest.pulls.get(params);
    if (revisionKey(current) !== identity) {
      throw new Error('PR metadata changed while waiting for assessment. A fresh gate is required.');
    }
    const { data } = await github.rest.actions.listWorkflowRuns({
      ...context.repo,
      workflow_id: workflow.id,
      head_sha: pull.head.sha,
      event: 'pull_request_target',
      per_page: 100,
    });
    const run = data.workflow_runs
      .filter(
        candidate =>
          candidate.workflow_id === workflow.id &&
          candidate.path === workflowPath &&
          candidate.event === 'pull_request_target' &&
          candidate.repository.full_name === `${context.repo.owner}/${context.repo.repo}` &&
          candidate.head_sha === pull.head.sha &&
          'display_title' in candidate &&
          candidate.display_title === runTitle,
      )
      .sort((a, b) => b.id - a.id)[0];
    if (run?.status === 'completed') {
      if (run.conclusion !== 'success') {
        throw new Error('The current PR risk assessment failed. Fix or rerun the trusted assessment.');
      }
      const jobs = await github.paginate(github.rest.actions.listJobsForWorkflowRun, {
        ...context.repo,
        run_id: run.id,
        filter: 'latest',
        per_page: 100,
      });
      const job = jobs.find(
        candidate =>
          candidate.run_id === run.id &&
          candidate.run_attempt === run.run_attempt &&
          candidate.name === jobName &&
          candidate.status === 'completed' &&
          candidate.conclusion === 'success',
      );
      if (job) {
        const { data: finished } = await github.rest.actions.getWorkflowRun({
          ...context.repo,
          run_id: run.id,
        });
        const { data: latest } = await github.rest.pulls.get(params);
        if (
          finished.run_attempt !== run.run_attempt ||
          finished.status !== 'completed' ||
          finished.conclusion !== 'success' ||
          revisionKey(latest) !== identity
        ) {
          throw new Error('The trusted assessment or PR changed during verification. Start a fresh gate.');
        }
        return;
      }
    }
    await wait();
  }
  throw new Error('No successful risk assessment for the current PR revision arrived before the gate deadline.');
}

module.exports = { revisionKey, waitForAssessment };
