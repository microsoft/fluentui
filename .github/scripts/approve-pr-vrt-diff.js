// @ts-check

/**
 *
 * @param {import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams & {config:{}} } options
 * @returns
 */
async function main(options) {
  const { context, core, github, config } = options;

  const { owner, repo, issue } = /** @type {typeof context.repo & {issue: {number:number}}} */ (context.repo);
  const pull_request = await github.rest.pulls.get({
    owner,
    repo,
    pull_number: issue.number,
  });

  const sha = pull_request.data.head.sha;
  const checkRuns = await github.rest.checks.listForRef({
    owner,
    repo,
    ref: sha,
  });

  // Find the check run you want to update (adjust the name if needed)
  const targetCheckRun = checkRuns.data.check_runs.find(
    // checkRun => checkRun.name === 'FORK TEST VRT/visual_regression',
    checkRun => checkRun.name === 'visual_regression',
  );

  if (!targetCheckRun) {
    console.log('Existing check run not found.');
    return;
  }

  const checkRunResult = 'success';
  let conclusion = checkRunResult === 'success' ? 'success' : 'failure';
  let status = 'completed';
  // if (checkRunResult === '') {
  //   conclusion = 'neutral';
  //   status = 'completed';
  // }

  const result = await github.rest.checks.update({
    owner,
    repo,
    check_run_id: targetCheckRun.id,
    status: status,
    conclusion: conclusion,
    output: {
      title: 'Updated Test Results',
      summary:
        checkRunResult === 'success'
          ? 'Tests passed!'
          : checkRunResult === 'failure'
          ? 'Tests failed.'
          : 'Tests did not run.',
      text:
        checkRunResult === 'success'
          ? 'All tests passed successfully (updated by comment).'
          : checkRunResult === 'failure'
          ? 'Some tests failed (updated by comment).'
          : 'No tests were executed.',
    },
  });

  console.log(result);
}

module.exports = main;
