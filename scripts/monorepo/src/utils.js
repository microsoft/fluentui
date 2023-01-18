const fs = require('fs');
const path = require('path');
const { workspaceRoot } = require('nx/src/utils/app-root');

const findGitRoot = require('./findGitRoot');

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

exports.getProjectMetadata = getProjectMetadata;
exports.workspaceRoot = workspaceRoot;
