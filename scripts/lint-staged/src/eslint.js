// @ts-check

// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');

const { findConfig } = require('@fluentui/scripts-utils');
const { default: PQueue } = require('p-queue');
const exec = promisify(child_process.exec);

/**
 * @see file://./eslint-for-package.js
 */
const eslintForPackageScript = path.join(__dirname, 'eslint-for-package.js');

/**
 * Since we have an eslint config file per package we need to respect this when running
 * eslint for staged files. To do this we group the files per package name. This function takes
 * a list of package names and returns an object with the package root as the key and the files
 * in that package as the value.
 *
 * @param {string[]} files
 * @returns {{ [packagePath: string]: string[] }}
 */
function groupFilesByPackage(files) {
  /** @type {{ [packagePath: string]: string[] }} */
  const filesByPackage = {};

  for (const file of files) {
    const packagePath = findConfig('project.json', file)?.replace('/project.json', '');

    if (!packagePath) {
      continue;
    }

    const hasEslintConfig =
      fs.existsSync(path.join(packagePath, '.eslintrc.json')) || fs.existsSync(path.join(packagePath, '.eslintrc.js'));

    if (!hasEslintConfig) {
      continue;
    }

    if (!filesByPackage[packagePath]) {
      filesByPackage[packagePath] = [];
    }
    filesByPackage[packagePath].push(file);
  }

  return filesByPackage;
}

/**
 * Runs eslint for the staged files in the packages that require it.
 * @param {string[]} files
 */
async function runEslintOnFilesGroupedPerPackage(files) {
  const filesGroupedByPackage = groupFilesByPackage(files);

  // Log an empty line on error to make the eslint output look better
  console.log('', filesGroupedByPackage);

  const queue = new PQueue({ concurrency: os.cpus().length / 2 });
  let hasError = false;

  await queue.addAll(
    // eslint-disable-next-line no-shadow
    Object.entries(filesGroupedByPackage).map(([packageRootAbsolutePath, files]) => async () => {
      // This script handles running eslint on ONLY touched files for each package.
      const cmd = `node ${eslintForPackageScript} ${files.join(' ')}`;
      console.log(`${cmd}`);

      return (
        exec(cmd, { cwd: packageRootAbsolutePath })
          // Log severity:error lint reports including severity:warn
          // this will also result in killing the process
          .catch((/** @type {{ stdout: string, stderr: string }} */ err) => {
            hasError = true;
            // child throws twice so to mitigate `Error: Error: ` output we remove the 1st one
            const report = err.stderr.replace('Error: ', '');
            console.error(report);
          })
      );
    }),
  );

  await queue
    .onEmpty()
    // handle any internal exec errors
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

function main() {
  /**
   * Files that are staged for commit - Absolute paths
   */
  const files = process.argv.slice(2);

  runEslintOnFilesGroupedPerPackage(files).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

main();
