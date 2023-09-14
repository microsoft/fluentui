const { getAffectedPackages } = require('@fluentui/scripts-monorepo');
const yargs = require('yargs');

const args = yargs
  .option('package', {
    alias: 'p',
    type: 'array',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    string: true,
    description: 'Package to check modified files from',
    demandOption: false,
  })
  .option('base', {
    type: 'string',
    description: 'Base of the current branch (usually main or master)',
    default: 'origin/master',
  })
  .version(false).argv;

const isPackageAffected = () => {
  const { package: packages, base } = args;
  const affectedPackages = getAffectedPackages(base);

  if (packages) {
    for (const pkg of packages) {
      if (affectedPackages.has(pkg)) {
        return true;
      }
    }
    return false;
  }

  return affectedPackages;
};

function main() {
  /**
   * In order for pipeline to capture and save the return value from a node script,
   * the output needs to be printed.
   */
  console.log(isPackageAffected());
}

main();
