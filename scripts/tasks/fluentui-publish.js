const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const findGitRoot = require('../monorepo/findGitRoot');
const { argv, logger } = require('just-scripts');
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

  const packageJsonFile = path.join(root, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFile);

  if (packageJson.workspaces) {
    packageJson.workspaces.packages = packages;
    fs.writeJSONSync(packageJsonFile, packageJson, { spaces: 2 });
  }
}

function gitTag(root) {
  const lernaJsonFile = path.join(root, 'lerna.json');
  const lernaJson = fs.readJSONSync(lernaJsonFile);
  const version = lernaJson.version;
  const tag = `fluentui_v${version}`;
  spawnSync('git', ['tag', '-a', '-f', tag, '-m', tag], { cwd: root });

  logger.info(
    `Release commit successfully tagged. To push the changes, run 'git push --no-verify --follow-tags --verbose origin HEAD:master'`
  );
}

module.exports.fluentuiPrepublish = function() {
  const root = findGitRoot();
  setPrivateFlagOnFluentuiPackages(root, false);
  setLernaPackages(root, ['packages/fluentui/*']);
};

module.exports.fluentuiPostpublish = function() {
  const root = findGitRoot();
  setPrivateFlagOnFluentuiPackages(root, true);
  setLernaPackages(root, ['apps/*', 'packages/*', 'scripts', 'packages/fluentui/*']);
  spawnSync('git', ['add', 'packages/fluentui', 'lerna.json'], { cwd: root });
  spawnSync('git', ['commit', '-m', 'bumping @fluentui packages'], { cwd: root });

  gitTag(root);
};

module.exports.fluentuiLernaPublish = function(bumpType) {
  return function() {
    const root = findGitRoot();

    const lernaPublishArgs = [
      'lerna',
      'publish',
      '--no-git-reset',
      '--no-push',
      '--no-git-tag-version',
      '--registry',
      argv().registry,
      bumpType
    ];

    logger.info(`Running this command: npx ${lernaPublishArgs.join(' ')}`);

    const result = spawnSync('npx', lernaPublishArgs, {
      cwd: root,
      shell: true,
      stdio: 'inherit'
    });

    if (result.status) {
      throw new Error(result.error || `lerna publish failed with status ${result.status}`);
    }
  };
};
