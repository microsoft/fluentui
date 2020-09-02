// @ts-check
const getAllPackageInfo = require('./getAllPackageInfo');
const runTo = require('./runTo');

const argv = process.argv.slice(2);

if (argv.length < 1) {
  console.log(`Usage:

  yarn run:published <script> [<args>]

This command runs <script> for all beachball-published packages (and their dependencies).
`);

  process.exit(0);
}

const script = argv[0];
const rest = argv.slice(1);

// Only include the packages that are published daily by beachball.
// This logic does the same thing as "--scope \"!packages/fluentui/*\"" in the root package.json's
// publishing-related scripts (and excludes private packages, which beachball does internally).
// It will need to be updated if the --scope changes.
const beachballPackages = Object.entries(getAllPackageInfo())
  .filter(([, { packageJson, packagePath }]) => !/[\\/]fluentui[\\/]/.test(packagePath) && packageJson.private !== true)
  .map(([packageName]) => packageName);

runTo(script, beachballPackages, rest);
