/**  @typedef {import('./types').Api} Api */

/**
 *
 * @param {Api} options
 */
async function main(options) {
  const { context, github, core, config } = options;

  /** @type {string[]} */
  const logs = [];

  const issue = context.payload.issue;
  if (!issue) {
    throw new Error('CONTEXT error. Issue not found');
  }
  const issueContent = issue.body?.trim() ?? '';

  if (!issueContent) {
    core.notice('issue body is empty! Exit early');
    return;
  }

  const processedData = config.params.filter(param => {
    return issueContent.indexOf(param.keyword) !== -1;
  })[0];

  if (!processedData) {
    logs.push('No keywords match!');
    logSummary({ core, logs });
    return;
  }

  await callApi({ context, github, data: processedData, logs });

  logSummary({ core, logs });
}

/**
 *
 * @param {{logs:string[];core:import('@actions/core')}} options
 */
function logSummary(options) {
  const { core, logs } = options;
  core.startGroup('Summary:');
  logs.forEach(log => core.info(log));
  core.endGroup();
}

/**
 *
 * @param {Pick<Api,'context'|'github'> & {data: Api['config']['params'][number]; logs:string[]}} options
 */
async function callApi(options) {
  const { context, data, github, logs } = options;

  const labelActionResult = await github.rest.issues.addLabels({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    labels: data.labels,
  });
  if (labelActionResult.status === 200) {
    logs.push(`Label set: ${data.labels}`);
  }

  if (data.assignees.length) {
    const assigneeActionResult = await github.rest.issues.addAssignees({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      assignees: data.assignees,
    });

    if (assigneeActionResult.status === 201) {
      logs.push(`Assignees set: ${data.assignees}`);
    }
  }
}

module.exports = { main };
