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
 * @param {(metadata:{project:import('@nx/devkit').ProjectConfiguration;packageJson:import('nx/src/utils/package-json').PackageJson})=>boolean} [predicate]
 */
function getAllPackageInfo(predicate) {
  if (!predicate && packageInfo && cwdForPackageInfo === process.cwd()) {
    return packageInfo;
  }

  const projects = getWorkspaceProjects();

  packageInfo = {};
  cwdForPackageInfo = process.cwd();

  for (const [projectName, projectConfig] of projects) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(workspaceRoot, projectConfig.root, 'package.json'), 'utf-8'),
    );

    if (predicate && !predicate({ project: projectConfig, packageJson })) {
      continue;
    }

    packageInfo[projectName] = {
      packagePath: projectConfig.root,
      packageJson,
      projectConfig,
    };
  }

  return packageInfo;
}

module.exports = getAllPackageInfo;
