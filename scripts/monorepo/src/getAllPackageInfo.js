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

    // NOTE: for compatibility reason we need to name the keys with monorepo scope otherwise there would be clashes with packages
    // TODO: this whole implementation will be redone/unified once we start using dynamic nx dependency graph where non repo packages are prefixed with `npm:<package-name>`
    const projectNameWithScope = `@fluentui/${projectName}`;

    packageInfo[projectNameWithScope] = {
      packagePath: projectConfig.root,
      packageJson,
      projectConfig,
    };
  }

  return packageInfo;
}

module.exports = getAllPackageInfo;
