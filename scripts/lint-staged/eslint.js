// @ts-check

const fs = require('fs');
const os = require('os');
const path = require('path');
const { rollup: lernaAliases } = require('lerna-alias');
const { default: PQueue } = require('p-queue');
const exec = require('../exec');

const eslintForPackageScript = path.join(__dirname, 'eslint-for-package.js');

const files = process.argv.slice(2);

/**
 * Since we have an eslint config file per package we need to respect this when running
 * eslint for staged files. To do this we group the files per package name. This function takes
 * a list of package names and returns an object with the package root as the key and the files
 * in that package as the value.
 * @returns {{ [packagePath: string]: string[] }}
 */
function groupFilesByPackage() {
  /** @type {{ [packagePath: string]: string[] }} */
  const filesByPackage = {};

  const packagesWithEslint = Object.values(lernaAliases({ sourceDirectory: false })).filter(
    packagePath =>
      // exclude @fluentui/noop (northstar packages root)
      path.basename(packagePath) !== 'fluentui' &&
      // only include packages with an eslintrc (any extension)
      fs.readdirSync(packagePath).some(f => f.startsWith('.eslintrc')),
  );

  for (const file of files) {
    const packagePath = packagesWithEslint.find(packagePath => file.startsWith(packagePath));
    // Exclude files in a package without an eslintrc (or not in a package at all)
    if (packagePath) {
      if (!filesByPackage[packagePath]) {
        filesByPackage[packagePath] = [];
      }
      filesByPackage[packagePath].push(file);
    }
  }

  return filesByPackage;
}

/**
 * Runs eslint for the staged files in the packages that require it.
 */
async function runEslintOnFilesGroupedPerPackage() {
  const filesGroupedByPackage = groupFilesByPackage();

  // Log an empty line on error to make the eslint output look better
  console.log('');

  const queue = new PQueue({ concurrency: os.cpus().length / 2 });
  let hasError = false;

  await queue.addAll(
    Object.entries(filesGroupedByPackage).map(([packagePath, files]) => async () => {
      // This script handles running eslint on ONLY the appropriate files for each package.
      // See its comments for more details.
      return exec(`node ${eslintForPackageScript} ${files.join(' ')}`, undefined, packagePath, process).catch(() => {
        // The subprocess should already have handled logging. Just mark that there was an error.
        hasError = true;
      });
    }),
  );

  await queue
    .onEmpty()
    .catch(error => {
      console.error(error);
      hasError = true;
    })
    .then(() => {
      if (hasError) {
        process.exit(1);
      }
    });
}

runEslintOnFilesGroupedPerPackage().catch(err => {
  console.error(err);
  process.exit(1);
});
