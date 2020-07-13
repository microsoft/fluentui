// @ts-check

const { getAllPackageInfo } = require('./monorepo/index');
const { spawnSync } = require('child_process');

// @ts-ignore
const isRunningScript = require.main === module;

/**
 * Check for references to tslint-related packages.
 * @param {import("./monorepo/index.d").PackageInfo[]} packageInfos
 */
function checkPackageJsons(packageInfos) {
  let hasError = false;

  for (const info of packageInfos) {
    const deps = [
      ...Object.keys(info.packageJson.dependencies || {}),
      ...Object.keys(info.packageJson.devDependencies || {}),
      ...Object.keys(info.packageJson.peerDependencies || {}),
    ];

    if (deps.some(dep => /\btslint\b/.test(dep))) {
      if (!hasError) {
        hasError = true;
        console.error('\nThe following packages have tslint-related dependencies:');
      }
      console.error('  ' + info.packagePath);
    }
  }

  if (hasError) {
    console.error('Please use eslint instead.');
    console.error('(Any dependencies on @uifabric/tslint-rules should be replaced with @fluentui/eslint-plugin.)\n');
  }

  return hasError;
}

module.exports = { checkPackageJsons };

if (isRunningScript) {
  const hasTslintDep = checkPackageJsons(Object.values(getAllPackageInfo()));

  const tslintLsResult = spawnSync('git', ['ls-files', 'tslint.json', "'**/tslint.json'"])
    .stdout.toString()
    .trim();
  if (tslintLsResult.length) {
    const tslintLines = tslintLsResult.split(/\r?\n/g);
    console.error('\nPlease replace the following new tslint.json files with .eslintrc.json files:');
    for (const file of tslintLines) {
      console.error('  ' + file);
    }
  }

  if (hasTslintDep || tslintLsResult.length) {
    process.exit(1);
  }
}
