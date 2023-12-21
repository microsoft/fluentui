const fs = require('fs');
const path = require('path');

const { workspaceRoot } = require('@nx/devkit');

const { getWorkspaceProjects } = require('./workspace-utils');

/**
 * @type {import('./types').AllPackageInfo}
 */
let packageInfo;
/**
 * @type {string}
 */
let cwdForPackageInfo;

/**
 * @returns {typeof packageInfo}
 */
function getAllPackageInfo() {
  if (packageInfo && cwdForPackageInfo === process.cwd()) {
    return packageInfo;
  }

  const projects = getWorkspaceProjects();

  packageInfo = {};
  cwdForPackageInfo = process.cwd();

  for (const [projectName, projectConfig] of projects) {
    packageInfo[projectName] = {
      packagePath: projectConfig.root,
      packageJson: JSON.parse(fs.readFileSync(path.join(workspaceRoot, projectConfig.root, 'package.json'), 'utf-8')),
    };
  }

  return packageInfo;
}

module.exports = getAllPackageInfo;
