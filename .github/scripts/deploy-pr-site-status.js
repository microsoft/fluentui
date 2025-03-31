// @ts-check

/**
 *
 * @param {import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams & {config:{websiteUrl:string;prId:string}} } options
 * @returns
 */
async function main(options) {
  const { context, core, github, config } = options;

  const { owner, repo } = context.repo;

  const pull_request = await github.rest.pulls.get({
    owner,
    repo,
    pull_number: Number(config.prId),
  });

  await github.rest.repos.createCommitStatus({
    owner,
    repo,
    sha: pull_request.data.head.sha,
    state: 'success',
    context: 'Pull request demo site',
    description: 'Click "Details" to go to the deployed demo site for this pull request',
    target_url: config.websiteUrl,
  });
}

module.exports = main;
