// @ts-check

/**
 *
 * @param {import('../../scripts/triage-bot/src/types.ts').GithubScriptsParams} options
 * @returns
 */
async function main(options) {
  const { context, github, core } = options;

  const report = process.env.report;

  if (report) {
    const comment = `
              ## Bundle Size Report
              Status: success

              ${report}
              `;

    // Check if a comment already exists (using the unique ID) to update instead of posting a new one
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: Number(context.payload.pull_request?.number),
    });

    const existingComment = comments.find(comment => comment.body?.includes('## Bundle Size Report'));

    if (existingComment) {
      // Update the existing comment
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: existingComment.id,
        body: comment,
      });
      return;
    }

    // Create a new comment
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: Number(context.payload.pull_request?.number),
      body: comment,
    });

    return;
  }

  console.log('No report content found to post to PR.');
}

module.exports = main;
