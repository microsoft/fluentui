const execSync = require('child_process').execSync;
const findGitRoot = require('./findGitRoot');

/**
 * Returns SHA for the nth commit from a reference descending from the latest commit
 * @param {number} [n=1] nth commit from latest
 * @param {number} [ref=HEAD] The github ref/branch the filter
 * @returns - A git commit SHA
 */
function getNthCommit(n = 1, ref = 'HEAD') {
  const out = execSync(`git rev-list ${ref} --max-count=1 --skip=${n}`);
  const commitSha = out.toString().trim();
  return commitSha;
}

module.exports = getNthCommit;
