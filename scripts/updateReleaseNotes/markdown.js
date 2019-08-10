// @ts-check
/// <reference path="./index.d.ts" />

const { argv, repoDetails } = require('./init');
const { getPullRequest } = require('./pullRequests');

const EOL = '\n';

/**
 * Build up the markdown from the entry description.
 * This includes fetching info about relevant pull requests, which can be slow/expensive.
 * @param {IChangelogEntry} entry
 */
async function getMarkdownForEntry(entry) {
  const comments =
    (await getChangeComments('Breaking changes', entry.comments.major)) +
    (await getChangeComments('Minor changes', entry.comments.minor)) +
    (await getChangeComments('Patches', entry.comments.patch));

  return (comments || '*Changes not tracked*') + EOL + EOL;
}

/**
 * Gets the release notes markdown corresponding to the comment array.
 * @param {string} title - Section title (probably change type, major/minor/patch)
 * @param {IChangelogComment[]} comments - Changelog comments for a version
 */
async function getChangeComments(title, comments) {
  const commitPrefix = `https://github.com/${repoDetails.owner}/${repoDetails.repo}/commit/`;
  if (comments) {
    const lines = ['## ' + title, ''];
    for (const comment of comments) {
      let line = `- ${comment.comment}`;
      if (comment.commit) {
        let pr = await getPullRequest(comment.commit, comment.author);

        const commit = pr && pr.mergeCommit && argv['use-merge-commit'] ? pr.mergeCommit : comment.commit;
        line += ` ([commit](${commitPrefix}${commit})`;

        if (pr) {
          line += ` by [${pr.author}](${pr.authorUrl}), PR [#${pr.number}](${pr.url})`;
        }

        line += `)`;
      }
      lines.push(line);
    }
    lines.push('', '');
    return lines.join(EOL);
  }
  return '';
}

module.exports = { getMarkdownForEntry };
