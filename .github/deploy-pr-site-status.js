// @ts-check

/**
 *
 * @param {import('../scripts/triage-bot/src/types.ts').GithubScriptsParams} options
 * @returns
 */
async function main(options) {
  const { context, core, github } = options;

  const { owner, repo } = context.repo;
  const pull_request = context.payload.pull_request;

  await github.rest.repos.createCommitStatus({
    // owner: 'microsoft',
    // repo: 'fluentui',
    owner,
    repo,
    sha: pull_request?.head.sha,
    state: 'success',
    context: 'Pull request demo site',
    description: 'Click "Details" to go to the deployed demo site for this pull request',
    target_url: process.env.DEPLOY_URL + '/',
  });
}

module.exports = main;
