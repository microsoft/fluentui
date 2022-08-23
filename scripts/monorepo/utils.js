// @ts-check

const fs = require('fs');
const path = require('path');

const findGitRoot = require('./findGitRoot');

/**
 * Gets project metadata from monorepo source of truth which is `workspace.json`
 * @param {{root?:string;name:string}} options
 * @returns {import('@nrwl/devkit').ProjectConfiguration}
 */
function getProjectMetadata(options) {
  const { root = findGitRoot() } = options;
  /**@type {import('@nrwl/devkit').WorkspaceJsonConfiguration} */
  const nxWorkspace = JSON.parse(fs.readFileSync(path.join(root, 'workspace.json'), 'utf-8'));

  return nxWorkspace.projects[options.name];
}

exports.getProjectMetadata = getProjectMetadata;
