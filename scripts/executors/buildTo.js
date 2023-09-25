const { runTo } = require('./runTo');

const isExecutedFromCli = require.main === module;

function main() {
  const argv = process.argv.slice(2);

  // Display a usage message when there are no projects specified
  if (argv.length < 1) {
    console.log(`Usage:

  yarn buildto <packagename1> [<packagename2> ...] [<args>]

This command builds all packages up to and including "packagename1" (and "packagename2" etc).
The package name can be a substring.
If multiple packages match a pattern, they will all be built (along with their dependencies).
`);

    process.exit(0);
  }

  const restIndex = argv.findIndex(arg => arg.startsWith('--'));
  const projects = restIndex === -1 ? argv : argv.slice(0, restIndex);
  const rest = restIndex === -1 ? [] : argv.slice(argv[restIndex] === '--' ? restIndex + 1 : restIndex);

  runTo('build', projects, rest);
}

if (isExecutedFromCli) {
  main();
}
