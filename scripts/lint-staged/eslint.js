// @ts-check

const glob = require('glob');
const os = require('os');
const path = require('path');
const { rollup: lernaAliases } = require('lerna-alias');
const { default: PQueue } = require('p-queue');
const exec = require('../exec');

const eslintForPackageScript = path.join(__dirname, 'eslint-for-package.js');

// Paths to packages with an eslintrc (with any extension)
const packagesWithEslint = Object.values(lernaAliases({ sourceDirectory: false })).filter(
  packagePath => !!glob.sync(path.join(packagePath, '.eslintrc*')).length,
);

const files = process.argv.slice(2);

runEslintOnFilesGroupedPerPackage(groupFilesByPackage(files));

/**
 * Since we have an eslint config file per package we need to respect this when running
 * eslint for staged files. To do this we group the files per package name. This function takes
 * a list of package names and returns an object with the package root as the key and the files
 * in that package as the value.
 *
 * @param {string[]} files
 * @returns {{[packagePath: string]: string[]}}
 */
function groupFilesByPackage(files) {
  return files
    .map(file => [packagesWithEslint.find(packagePath => file.startsWith(packagePath)), file])
    .filter(
      ([packagePath, file]) =>
        // Exclude files in a package without an eslintrc (or not in a package at all)
        !!packagePath &&
        // For now, exclude files that are not under src or test--these would cause errors if the
        // package's eslint config uses @typescript-eslint/parser with 'project' (tsconfig path)
        // option, because only src and test will be included in the tsconfig.
        /^(src|test)\b/.test(path.relative(packagePath, file)),
    )
    .reduce((filesByPackage, [packagePath, file]) => {
      if (!filesByPackage[packagePath]) {
        filesByPackage[packagePath] = [];
      }
      filesByPackage[packagePath].push(file);
      return filesByPackage;
    }, {});
}

/**
 * Runs eslint for the staged files in the packages that require it.
 *
 * @param {{[packagePath: string]: string[]}} filesGroupedByPackage
 */
async function runEslintOnFilesGroupedPerPackage(filesGroupedByPackage) {
  // Log an empty line on error to make the eslint output look better
  console.log('');

  const queue = new PQueue({ concurrency: os.cpus().length / 2 });
  let hasError = false;

  await queue.addAll(
    Object.entries(filesGroupedByPackage).map(([packagePath, files]) => async () => {
      // We can't just run the eslint CLI on the filenames because directly passed filenames
      // override ignores configured elsewhere (so files that should be ignored would be linted).
      // So manually filter out ignored files then run eslint via its API as described here:
      //   https://www.npmjs.com/package/lint-staged#how-can-i-ignore-files-from-eslintignore-
      // In our case, we also need to run it in a different subprocess per package because some
      // of our eslint config relies on process.cwd() to infer info about the package.
      return exec(`node ${eslintForPackageScript} ${files.join(' ')}`, undefined, packagePath, process).catch((
        /** @type {import("../exec").ExecResult} */ err,
      ) => {
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
