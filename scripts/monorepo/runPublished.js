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

const beachballPackages = Object.entries(getAllPackageInfo())
  .filter(([, { packageJson, packagePath }]) => !/[\\/]fluentui[\\/]/.test(packagePath) && packageJson.private !== true)
  .map(([packageName]) => packageName);

runTo(script, beachballPackages, rest);
