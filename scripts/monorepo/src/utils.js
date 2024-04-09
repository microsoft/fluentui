const { execSync } = require('child_process');

const { workspaceRoot, readProjectConfiguration } = require('@nx/devkit');

const { tree } = require('./tree');

const TEN_MEGABYTES = 1024 * 10000;

/**
 * Gets nx project metadata
 * @param {string} projectName - package name
 * @param {ReturnType<typeof import('@nx/devkit').getProjects>=} allProjects - all workspace projects
 * @returns {import('@nx/devkit').ProjectConfiguration}
 */
function getProjectMetadata(projectName, allProjects) {
  if (allProjects) {
    const project = allProjects.get(projectName);

    if (!project) {
      throw new Error(`Project ${projectName} not found in workspace`);
    }

    return project;
  }

  return readProjectConfiguration(tree, projectName);
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
