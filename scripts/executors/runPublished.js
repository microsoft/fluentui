const { spawnSync } = require('child_process');

const { getAllPackageInfo, isConvergedPackage } = require('@fluentui/scripts-monorepo');
const lageBin = require.resolve('lage/bin/lage.js');

/**
 * @typedef {{argv:string[]; workspacePackagesMetadata:ReturnType<typeof getAllPackageInfo>;}} Options
 */

const isExecutedFromCli = require.main === module;

if (isExecutedFromCli) {
  const argv = process.argv.slice(2);
  main({ argv, workspacePackagesMetadata: getAllPackageInfo() });
}

module.exports = main;

/**
 *
 * @param {Options} options
 */
function main(options) {
  if (!(isExecutedFromCli || process.env.NODE_ENV === 'test')) {
    throw new Error('This is NOT supposed to be used as API only via direct node execution');
  }
  if (!assertArgs(options.argv)) {
    return;
  }

  const lageArgs = getLageArgs(options);

  const result = spawnSync(process.execPath, [lageBin, ...lageArgs], {
    stdio: 'inherit',
    maxBuffer: 500 * 1024 * 1024,
  });

  process.exit(result.status ?? undefined);
}

/**
 *
 * @param {string[]} args
 */
function assertArgs(args) {
  if (args.length < 1) {
    console.log(`Usage:

  yarn run:published <script> [<args>]

This command runs <script> for all beachball-published packages, as well as packages for the version 8 website.
`);

    return false;
  }

  return true;
}

/**
 *
 * @param {Options} options
 * @returns
 */
function getLageArgs(options) {
  const { argv, workspacePackagesMetadata } = options;

  const releaseScope = process.env.RELEASE_VNEXT ? 'v9' : 'v8';
  const websitePackages = [
    '@fluentui/public-docsite',
    '@fluentui/public-docsite-resources',
    '@fluentui/react-examples',
    '@fluentui/api-docs',
  ];

  // Only include the packages that are published daily by beachball, and some website/doc packages
  // (which must be built and uploaded with each release). This is similar to "--scope \"!packages/fluentui/*\""
  // in the root package.json's publishing-related scripts and will need to be updated if --scope changes.
  const beachballPackageScopes = Object.values(workspacePackagesMetadata)
    .filter(({ packageJson, projectConfig, packagePath }) => {
      const isNorthstar = /[\\/]fluentui[\\/]/.test(packagePath);
      const isWebComponents = packageJson.name === '@fluentui/web-components';

      if (isNorthstar || isWebComponents) {
        return false;
      }

      const isConverged = isConvergedPackage({ packageJson, project: projectConfig });
      if (releaseScope === 'v9' && isConverged) {
        return packageJson.private !== true;
      }

      if (releaseScope === 'v8' && !isConverged) {
        // v8 scope
        return websitePackages.includes(packageJson.name) || packageJson.private !== true;
      }

      // Ignore v9/converged packages when releasing v8
      return false;
    })
    .map(({ packageJson }) => `--to=${packageJson.name}`);

  const lageArgs = [
    'run',
    ...argv,
    // default to verbose mode unless already/otherwise specified
    ...(argv.some(arg => /^--(no-)?verbose/.test(arg)) ? [] : ['--verbose']),
    ...beachballPackageScopes,
  ];
  console.log(`lage ${lageArgs.join(' ')}`); // for debugging

  return lageArgs;
}
