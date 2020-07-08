// @ts-check

const { getAllPackageInfo } = require('./monorepo/index');

/**
 * Check for references to tslint-related packages.
 * @param {import("./monorepo/index.d").PackageInfo[]} packageInfos
 */
function checkPackageJsons(packageInfos) {
  let hasLoggedHeader = false;

  for (const info of packageInfos) {
    const deps = [
      ...Object.keys(info.packageJson.dependencies || {}),
      ...Object.keys(info.packageJson.devDependencies || {}),
      ...Object.keys(info.packageJson.peerDependencies || {}),
    ];

    if (deps.some(dep => /\btslint\b/.test(dep))) {
      if (!hasLoggedHeader) {
        hasLoggedHeader = true;
        console.error('\nThe following packages have tslint-related dependencies:');
      }
      console.error('  ' + info.packagePath);
    }
  }

  if (hasLoggedHeader) {
    console.error('Please use eslint instead.');
    console.error('(Any dependencies on @uifabric/tslint-rules should be replaced with @fluentui/eslint-plugin.)\n');
    process.exit(1);
  }
}

module.exports = { checkPackageJsons };

// @ts-ignore
if (require.main === module) {
  checkPackageJsons(Object.values(getAllPackageInfo()));
}
