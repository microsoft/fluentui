const { execSync } = require('child_process');

/**
 * Returns SHA for the nth commit from a reference descending from the latest commit
 * @param {number} [n=1] nth commit from latest
 * @param {string} [ref=HEAD] The github ref/branch the filter
 * @returns - A git commit SHA
 */
function getNthCommit(n = 1, ref = 'HEAD') {
  const out = execSync(`git rev-list ${ref} --max-count=1 --skip=${n}`);
  const commitSha = out.toString().trim();
  return commitSha;
}

exports.getNthCommit = getNthCommit;
