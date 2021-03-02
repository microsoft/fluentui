// @ts-check
const { spawnSync } = require('child_process');
const getAllPackageInfo = require('./getAllPackageInfo');
const lageBin = require.resolve('lage/bin/lage.js');

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log(`Usage:

  yarn run:published <script> [<args>]

This command runs <script> for all beachball-published packages (and their dependencies).
`);

  process.exit(0);
}

// Only include the packages that are published daily by beachball.
// This logic does the same thing as "--scope \"!packages/fluentui/*\"" in the root package.json's
// publishing-related scripts (and excludes private packages, which beachball does internally).
// It will need to be updated if the --scope changes.
const beachballPackageScopes = Object.entries(getAllPackageInfo())
  .filter(([, { packageJson, packagePath }]) => !/[\\/]fluentui[\\/]/.test(packagePath) && packageJson.private !== true)
  .map(([packageName]) => `--to=${packageName}`);

const lageArgs = ['run', ...argv, ...beachballPackageScopes];
console.log(`lage ${lageArgs.join(' ')}`); // for debugging

const result = spawnSync(process.execPath, [lageBin, ...lageArgs], {
  stdio: 'inherit',
  maxBuffer: 500 * 1024 * 1024,
});

process.exit(result.status);
