const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { workspaceRoot } = require('@nrwl/devkit');

const findGitRoot = require('./findGitRoot');
const TEN_MEGABYTES = 1024 * 10000;

/**
 * Gets project metadata from monorepo source of truth which is `workspace.json`
 * @param {Object} options
 * @param {string} [options.root] - repo root path
 * @param {string} options.name - package name
 * @returns {import('@nrwl/devkit').ProjectConfiguration}
 */
function getProjectMetadata(options) {
  const { root = findGitRoot() } = options;

  /**@type {import('@nrwl/devkit').WorkspaceJsonConfiguration} */
  const nxWorkspace = JSON.parse(fs.readFileSync(path.join(root, 'workspace.json'), 'utf-8'));

  return nxWorkspace.projects[options.name];
}

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
exports.getProjectMetadata = getProjectMetadata;
exports.workspaceRoot = workspaceRoot;
