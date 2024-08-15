const path = require('path');

const { getProjects, workspaceRoot } = require('@nx/devkit');

const { tree } = require('./tree');

function getWorkspaceProjects(_tree = tree) {
  const projects = getProjects(_tree);

  return projects;
}

/**
 *
 * @param {{excludeProjects?: string[]; type?:'default' | 'webpack' | 'jest'}} [options]
 */
function getWorkspaceProjectsAliases(options = {}) {
  const { type = 'default', excludeProjects = [] } = options;
  const projects = getWorkspaceProjects();

  for (const projectName of excludeProjects) {
    // getWorkspaceProjects() returns names without `@fluentui` scope, for compatibility reasons we need to support both within `excludeProjects`
    projects.delete(projectName.replace('@fluentui/', ''));
  }

  /**
   * @type {Record<string,string>}
   */
  const aliases = {};

  for (const [projectName, projectConfig] of projects) {
    // projectName doesn't contain `@fluentui` scope, but alias key needs to map to real packageName
    const key = getAliasKey[type](`@fluentui/${projectName}`);
    const sourceRoot = projectConfig.sourceRoot ?? path.join(projectConfig.root, 'src');
    const entry = path.join(sourceRoot, 'index');
    aliases[key] = path.join(workspaceRoot, entry);
  }

  return aliases;
}

const getAliasKey = {
  jest: (/** @type {string} */ packageName) => `^${packageName}$`,
  webpack: (/** @type {string} */ packageName) => `${packageName}$`,
  default: (/** @type {string} */ packageName) => packageName,
};

exports.getWorkspaceProjects = getWorkspaceProjects;
exports.getWorkspaceProjectsAliases = getWorkspaceProjectsAliases;
