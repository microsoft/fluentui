// @ts-check

const { existsSync, readdirSync } = require('node:fs');
const { join } = require('node:path');

/**
 *
 * @returns {{ usedNodeModulesPath: string, workspaceRootNodeModulesPath: string }} The path to the node_modules directory used by the project
 */
function getNodeModulesPath() {
  const projectRoot = join(__dirname, '..');
  const rootNodeModulesPath = join(projectRoot, '../..', 'node_modules');
  const nohoistNodeModulesPath = join(projectRoot, './node_modules');
  const usedNodeModulesPath = existsSync(join(nohoistNodeModulesPath, 'react'))
    ? nohoistNodeModulesPath
    : rootNodeModulesPath;

  const reactPath = join(usedNodeModulesPath, './react');
  const reactDomPath = join(usedNodeModulesPath, './react-dom');

  console.log('Using node_modules from:', usedNodeModulesPath, readdirSync(usedNodeModulesPath));
  console.log('Using React from:', reactPath);
  console.log('Using ReactDOM from:', reactDomPath);

  return { usedNodeModulesPath, workspaceRootNodeModulesPath: rootNodeModulesPath };
}

module.exports = {
  getNodeModulesPath,
};
