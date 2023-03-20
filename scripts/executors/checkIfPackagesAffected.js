const { getAffectedPackages, getNthCommit } = require('@fluentui/scripts-monorepo');
const yargs = require('yargs');

const args = yargs
  .option('packages', {
    alias: 'p',
    type: 'array',
    description: 'Package to check modified files from',
    demandOption: true,
  })
  .option('pr', {
    alias: 'r',
    type: 'boolean',
    description: 'During PR build compares to origin/master, in CI build compares to last commit',
    default: false,
  })
  .scriptName('bundle-size')
  .version(false).argv;

const isPackageAffected = () => {
  const { packages, pr } = args;

  let affectedPackages = new Set();

  if (pr) {
    affectedPackages = getAffectedPackages();
  } else {
    // master CI build,
    const previousMasterCommit = getNthCommit();
    affectedPackages = getAffectedPackages(previousMasterCommit);
  }

  for (const pkg of packages) {
    if (affectedPackages.has(pkg)) {
      return true;
    }
  }
  return false;
};

function main() {
  /**
   * In order for pipeline to capture and save the return value from a node script,
   * the output needs to be printed.
   */
  console.log(isPackageAffected());
}

main();
