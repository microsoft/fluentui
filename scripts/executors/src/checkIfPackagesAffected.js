const { getAffectedPackages } = require('@fluentui/scripts-monorepo');
const yargs = require('yargs');

const args = yargs
  .option('project', {
    alias: 'p',
    type: 'array',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    string: true,
    description: 'project to check modified files from',
    demandOption: false,
  })
  .option('base', {
    type: 'string',
    description: 'Base of the current branch (usually main or master)',
    default: 'origin/master',
  })
  .strict(true)
  .version(false).argv;

const isPackageAffected = () => {
  const { project: projects, base } = args;
  const affectedPackages = getAffectedPackages(base);

  if (projects) {
    for (const pkg of projects) {
      if (affectedPackages.has(normalizeProjectName(pkg))) {
        return true;
      }
    }
    return false;
  }

  return affectedPackages;
};

function normalizeProjectName(/** @type {string} */ value) {
  return value.replace('@fluentui/', '');
}

function main() {
  /**
   * In order for pipeline to capture and save the return value from a node script,
   * the output needs to be printed.
   */
  console.log(isPackageAffected());
}

main();
