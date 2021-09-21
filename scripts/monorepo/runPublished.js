// @ts-check
const { spawnSync } = require('child_process');
const getAllPackageInfo = require('./getAllPackageInfo');
const isConvergedPackage = require('./isConvergedPackage');
const lageBin = require.resolve('lage/bin/lage.js');

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log(`Usage:

  yarn run:published <script> [<args>]

This command runs <script> for all beachball-published packages, as well as packages for the version 8 website.
`);

  process.exit(0);
}

const websitePackages = [
  '@fluentui/public-docsite',
  '@fluentui/public-docsite-resources',
  '@fluentui/react-examples',
  '@fluentui/api-docs',
];

// Only include the packages that are published daily by beachball, and some website/doc packages
// (which must be built and uploaded with each release). This is similar to "--scope \"!packages/fluentui/*\""
// in the root package.json's publishing-related scripts and will need to be updated if --scope changes.
const beachballPackageScopes = Object.entries(getAllPackageInfo())
  .filter(([, { packageJson, packagePath }]) => {
    // Ignore northstar and private packages
    if (/[\\/]fluentui[\\/]/.test(packagePath) || packageJson.private === true) {
      return false;
    }

    if (process.env.RELEASE_VNEXT) {
      return isConvergedPackage(packageJson);
    }

    return websitePackages.includes(packageJson.name);
  })
  .map(([packageName]) => `--to=${packageName}`)
  .filter(Boolean);

const lageArgs = [
  'run',
  ...argv,
  // default to verbose mode unless already/otherwise specified
  ...(argv.some(arg => /^--(no-)?verbose/.test(arg)) ? [] : ['--verbose']),
  ...beachballPackageScopes,
];
console.log(`lage ${lageArgs.join(' ')}`); // for debugging

const result = spawnSync(process.execPath, [lageBin, ...lageArgs], {
  stdio: 'inherit',
  maxBuffer: 500 * 1024 * 1024,
});

process.exit(result.status);
