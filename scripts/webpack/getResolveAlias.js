const path = require('path');

const { findRepoDeps, findGitRoot } = require('../monorepo/index');
const { readConfig } = require('../read-config');

function getOutputPath(packageJson) {
  for (const mainField of ['module', 'main']) {
    const main = packageJson[mainField];
    if (main) {
      return main.includes('dist/es') ? 'dist/es' : 'lib';
    }
  }

  return 'lib';
}

function getResolveAlias() {
  const gitRoot = findGitRoot();
  const deps = findRepoDeps();

  const alias = {};
  const excludedPackages = [
    '@fluentui/eslint-rules',
    '@uifabric/api-docs',
    '@uifabric/build',
    '@uifabric/webpack-utils',
    '@uifabric/jest-serializer-merge-styles',
  ];

  let cwd = process.cwd();
  const packageJson = readConfig(path.join(cwd, 'package.json'));

  deps.forEach(depInfo => {
    if (!excludedPackages.includes(depInfo.packageJson.name)) {
      alias[`${depInfo.packageJson.name}$`] = path.join(gitRoot, depInfo.packagePath, 'src');
      alias[`${depInfo.packageJson.name}/src`] = path.join(gitRoot, depInfo.packagePath, 'src');

      const outputPath = getOutputPath(depInfo.packageJson);

      alias[`${depInfo.packageJson.name}/${outputPath}`] = path.join(gitRoot, depInfo.packagePath, 'src');
    }
  });

  alias[`${packageJson.name}$`] = path.join(cwd, 'src');
  alias[`${packageJson.name}/src`] = path.join(cwd, 'src');

  const outputPath = getOutputPath(packageJson);

  alias[`${packageJson.name}/${outputPath}`] = path.join(cwd, 'src');

  return alias;
}

module.exports = getResolveAlias;

if (require.main === module) {
  console.log(getResolveAlias());
}
