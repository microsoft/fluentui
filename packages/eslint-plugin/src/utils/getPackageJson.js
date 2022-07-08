const fs = require('fs-extra');
const path = require('path');

/**
 *  @typedef {{root: string, name: string}} Options
 *  @typedef {{name: string, version: string, dependencies: {[key: string]: string}}} PackageJson
 *  @typedef {import("@nrwl/tao/src/shared/workspace").WorkspaceJsonConfiguration} WorkspaceJsonConfiguration
 */

function getPackageJson(/** @type {Options} */ options) {
  /** @type {WorkspaceJsonConfiguration} */
  const nxWorkspace = JSON.parse(fs.readFileSync(path.join(options.root, 'workspace.json'), 'utf-8'));
  const projectMetaData = nxWorkspace.projects[options.name];
  const packagePath = path.join(options.root, projectMetaData.root);
  /** @type {PackageJson} */
  const packageJson = fs.readJSONSync(path.join(packagePath, 'package.json'));

  return packageJson;
}

module.exports = getPackageJson;
