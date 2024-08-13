const { execSync } = require('child_process');

const { workspaceRoot } = require('@nx/devkit');

const TEN_MEGABYTES = 1024 * 10000;

/**
 *
 * @param {string} command
 * @returns {string[]}
 */
function parseGitOutput(command) {
  return execSync(command, { maxBuffer: TEN_MEGABYTES, cwd: workspaceRoot })
    .toString('utf-8')
    .split('\n')
    .map(a => a.trim())
    .filter(a => a.length > 0);
}

/**
 *
 * @returns {string[]}
 */
function getUncommittedFiles() {
  return parseGitOutput(`git diff --name-only --no-renames --relative HEAD .`);
}

/**
 *
 * @returns {string[]}
 */
function getUntrackedFiles() {
  return parseGitOutput(`git ls-files --others --exclude-standard`);
}

exports.getUncommittedFiles = getUncommittedFiles;
exports.getUntrackedFiles = getUntrackedFiles;
exports.workspaceRoot = workspaceRoot;
