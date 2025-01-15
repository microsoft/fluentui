/* eslint-disable @typescript-eslint/naming-convention */

/**  @typedef {import('github-script').AsyncFunctionArguments} AsyncFunctionArguments */

/**
 *
 * @param {AsyncFunctionArguments} options
 */
async function main(options) {
  const { context, github } = options;

  const issueNumber = context.payload?.issue?.number;

  if (!issueNumber) {
    throw new Error('no issue number provided!');
  }

  const issue = await github.rest.issues.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issueNumber,
  });

  const issueMD = issue.data.body;

  // 1. todo parse markdown
  // 2. extract Component string `## Component > content`
  // 3. assign Labels based on Component
  // 4. assign code-owners based on Labels
  console.log(issueMD);
}

module.exports = main;
