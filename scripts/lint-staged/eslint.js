// @ts-check

const { spawnSync } = require('child_process');
const glob = require('glob');
const path = require('path');
const { rollup: lernaAliases } = require('lerna-alias');

// Paths to packages with an eslintrc
const packagesWithEslint = Object.values(lernaAliases({ sourceDirectory: false })).filter(
  packagePath => !!glob.sync(path.join(packagePath, '.eslintrc*')).length,
);

const rootDirectory = path.join(path.resolve(__dirname, '..', '..'), path.sep);
const eslintPath = path.join(rootDirectory, 'node_modules/.bin/eslint');

const files = process.argv.slice(2);

runEslintOnFilesGroupedPerPackage(groupFilesByPackage(files));

/**
 * Since we have an eslint config file per package we need to respect this when running
 * eslint for staged files. To do this we group the files per package name. This function takes
 * a list of package names and returns an object with the package root as the key and the files
 * in that package as the value.
 *
 * @param {string[]} files
 * @returns {{[packageName: string]: string[]}}
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
function runEslintOnFilesGroupedPerPackage(filesGroupedByPackage) {
  // Log an empty line on error to make the eslint output look better
  console.log('');

  // With eslint we have to manually track the exit status of each sub-process and exit the parent accordingly
  let exitStatus = 0;

  for (let [packagePath, files] of Object.entries(filesGroupedByPackage)) {
    const filteredFiles = files.filter(f => !f.endsWith('.api.ts'));

    if (filteredFiles.length === 0) {
      continue;
    }

    const result = spawnSync(process.execPath, [eslintPath, '--fix', '--color', ...filteredFiles], {
      cwd: packagePath,
      stdio: 'inherit',
    });
    // keep previous non-0 status (if any) or take this one
    exitStatus = exitStatus || result.status;
  }

  process.exit(exitStatus);
}
