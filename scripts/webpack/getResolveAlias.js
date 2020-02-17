const path = require('path');

const findRepoDeps = require('../monorepo/findRepoDeps');
const findGitRoot = require('../monorepo/findGitRoot');
const { readConfig } = require('../read-config');

function getResolveAlias() {
  const gitRoot = findGitRoot();
  const deps = findRepoDeps();
  const alias = {};
  const excludedPackages = ['@uifabric/api-docs'];

  let cwd = process.cwd();
  const packageJson = readConfig(path.join(cwd, 'package.json'));

  deps.forEach(depInfo => {
    if (!depInfo.packageJson.private && !excludedPackages.includes(depInfo.packageJson.name)) {
      alias[`${depInfo.packageJson.name}$`] = path.join(gitRoot, depInfo.packagePath, 'src');
      alias[`${depInfo.packageJson.name}/src`] = path.join(gitRoot, depInfo.packagePath, 'src');
      alias[`${depInfo.packageJson.name}/lib`] = path.join(gitRoot, depInfo.packagePath, 'src');
    }
  });

  alias[`${packageJson.name}$`] = path.join(cwd, 'src');
  alias[`${packageJson.name}/src`] = path.join(cwd, 'src');
  alias[`${packageJson.name}/lib`] = path.join(cwd, 'src');

  return alias;
}

module.exports = getResolveAlias;

if (require.main === module) {
  console.log(getResolveAlias());
}
