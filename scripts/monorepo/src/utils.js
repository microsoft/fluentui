const { workspaceRoot, readProjectConfiguration } = require('@nrwl/devkit');
const { FsTree } = require('nx/src/generators/tree');

const findGitRoot = require('./findGitRoot');

/**
 * Gets project metadata from monorepo source of truth which is `project.json` per project
 * @param {Object} options
 * @param {string} [options.root] - repo root path
 * @param {string} options.name - package name
 * @returns {import('@nrwl/devkit').ProjectConfiguration}
 */
function getProjectMetadata(options) {
  const { root = findGitRoot() } = options;
  /**
   * @type {import('@nrwl/devkit').Tree}
   */
  const tree = new FsTree(root, false);

  return readProjectConfiguration(tree, options.name);
}

exports.getProjectMetadata = getProjectMetadata;
exports.workspaceRoot = workspaceRoot;
