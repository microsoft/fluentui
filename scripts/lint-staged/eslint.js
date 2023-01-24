// @ts-check

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');
const { rollup: lernaAliases } = require('lerna-alias');
const { default: PQueue } = require('p-queue');
const exec = promisify(child_process.exec);

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
    // eslint-disable-next-line no-shadow
    const packagePath = packagesWithEslint.find(packagePath => {
      // if file lives within searched package we will get only shortened absolute path `/src/abc.ts`
      // we add `.` to make it relative and thus have match pattern to check upon
      const normalizedFilePath = file.replace(packagePath, '.');
      return normalizedFilePath.startsWith('./');
    });

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
    // eslint-disable-next-line no-shadow
    Object.entries(filesGroupedByPackage).map(([packagePath, files]) => async () => {
      const cmd = `node ${eslintForPackageScript} ${files.join(' ')}`;

      // This script handles running eslint on ONLY the appropriate files for each package.
      // See its comments for more details.
      return exec(cmd, { cwd: packagePath }).catch((/** @type {{ stdout: string, stderr: string }} */ err) => {
        // The subprocess should already have handled logging. Just mark that there was an error.
        hasError = true;
        throw new Error(err.stderr);
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
