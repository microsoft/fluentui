// @ts-check

const glob = require('glob');
const os = require('os');
const path = require('path');
const { ESLint } = require('eslint');
const { rollup: lernaAliases } = require('lerna-alias');
const { default: PQueue } = require('p-queue');
const { configHelpers } = require('@fluentui/eslint-plugin');

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
 * Excludes all API extractor files.
 *
 * @param {{[packagePath: string]: string[]}} filesGroupedByPackage
 */
async function runEslintOnFilesGroupedPerPackage(filesGroupedByPackage) {
  // Log an empty line on error to make the eslint output look better
  console.log('');

  const queue = new PQueue({ concurrency: os.cpus().length / 2 });
  const cwd = process.cwd();
  let hasError = false;

  await queue.addAll(
    Object.entries(filesGroupedByPackage).map(([packagePath, files]) => async () => {
      // We can't just run the eslint CLI on the filenames because directly passed filenames
      // override ignores configured elsewhere (so files that should be ignored would be linted).
      // So manually filter out ignored files then run eslint via its API.
      // https://www.npmjs.com/package/lint-staged#how-can-i-ignore-files-from-eslintignore-

      // chdir is because some of the eslint config relies on process.cwd() to infer the package
      process.chdir(packagePath);
      const eslint = new ESLint({
        cwd: packagePath,
        extensions: configHelpers.extensions,
        fix: true,
        cache: true,
      });
      process.chdir(cwd);

      // Filter out ignored files (2-step process due to isPathIgnored returning a promise)
      const ignoreResults = await Promise.all(files.map(f => eslint.isPathIgnored(f)));
      const filteredFiles = files.filter((f, i) => !ignoreResults[i]);

      if (filteredFiles.length === 0) {
        return;
      }

      // Lint files then fix all auto-fixable issues
      const results = await eslint.lintFiles(filteredFiles);
      await ESLint.outputFixes(results);

      // Format results
      const formatter = await eslint.loadFormatter();
      const resultText = formatter.format(results);
      if (resultText) {
        hasError = true;
        console.error(resultText);
      }
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
