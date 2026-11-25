// @ts-check

const { readFileSync } = require('node:fs');

module.exports = main;

/**
 *
 * @param {Pick<import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams,'github'|'context'> & {filePath:string}} options
 * @returns {Promise<number>}
 */
async function main(options) {
  const { filePath, github, context } = options;
  const prNumber = validatePrNumber(filePath);

  await validatePrIdentity({ prNumber, github, context });

  return prNumber;
}

/**
 *
 * @param {string} filePath
 * @returns {number}
 */
function validatePrNumber(filePath) {
  const content = readFileSync(filePath, 'utf-8').trim();
  const prNumber = Number(content);

  if (isNaN(prNumber) || !Number.isInteger(prNumber)) {
    throw new Error('The ID in pr.txt is not a valid PR number.');
  }

  console.info('✅ PR ID valid');
  return prNumber;
}

/**
 * Validates that the PR number from the artifact matches the workflow run that produced it.
 * This prevents a malicious PR from injecting a different PR number in the artifact.
 *
 * NOTE: This function is designed to run exclusively within `workflow_run` triggered workflows.
 * It uses `context.payload.workflow_run.repository` (not `context.repo`) because in a `workflow_run`
 * context we need to reference the repository that originated the triggering workflow run.
 *
 * @param {{prNumber: number} & Pick<import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams,'github'|'context'>} options
 */
async function validatePrIdentity({ prNumber, github, context }) {
  const owner = context.payload.workflow_run.repository.owner.login;
  const repo = context.payload.workflow_run.repository.name;
  const expectedSha = context.payload.workflow_run.head_sha;

  const { data: pr } = await github.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
  });

  if (pr.head.sha !== expectedSha) {
    throw new Error(
      `❌ PR #${prNumber} head SHA (${pr.head.sha}) does not match workflow run head SHA (${expectedSha}).`,
    );
  }

  console.info('✅ PR identity verified against workflow run');
}
