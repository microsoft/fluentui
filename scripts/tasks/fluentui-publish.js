const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const findGitRoot = require('../monorepo/findGitRoot');
const { argv } = require('just-scripts');
const { spawnSync } = require('child_process');

const denyList = ['@fluentui/docs', '@fluentui/e2e', '@fluentui/perf', '@fluentui/perf-test', '@fluentui/digest'];

/**
 * changes packages/fluentui packages to be public (those not in a deny-list)
 */
function setPrivateFlagOnFluentuiPackages(root, flag) {
  // We will flip all the @fluentui/* under packages/fluentui to public (barring things in a deny-list)
  const fuiPackageJsonFiles = glob.sync('packages/fluentui/*/package.json', { cwd: root });
  for (let packageJsonFile of fuiPackageJsonFiles) {
    const fullPath = path.join(root, packageJsonFile);
    const packageJson = fs.readJSONSync(fullPath);
    if (!denyList.includes(packageJson.name)) {
      packageJson.private = flag;
    }
    fs.writeJSONSync(fullPath, packageJson, { spaces: 2 });
  }
}

function setLernaPackages(root, packages) {
  const lernaJsonFile = path.join(root, 'lerna.json');
  const lernaJson = fs.readJSONSync(lernaJsonFile);
  lernaJson.packages = packages;
  fs.writeJSONSync(lernaJsonFile, lernaJson, { spaces: 2 });
}

module.exports.fluentuiPrepublish = function() {
  const root = findGitRoot();
  setPrivateFlagOnFluentuiPackages(root, false);
  setLernaPackages(root, ['packages/fluentui/*']);
};

module.exports.fluentuiPostpublish = function() {
  const root = findGitRoot();
  setPrivateFlagOnFluentuiPackages(root, true);
  setLernaPackages(root, ['packages/*', 'apps/*', 'scripts', 'packages/fluentui/*']);
};

module.exports.fluentuiLernaPublish = function(bumpType) {
  return function() {
    const root = findGitRoot();
    return spawnSync('npx', ['lerna', 'publish', '--no-push', '--no-git-tag-version', '--registry', argv().registry, bumpType], {
      cwd: root,
      shell: true,
      stdio: 'inherit'
    });
  };
};
