// @ts-check

const { spawnSync } = require('child_process');
const path = require('path');
const msCustomRulesMain = require.resolve('tslint-microsoft-contrib');
const rulesPath = path.dirname(msCustomRulesMain);
const tslintPath = require.resolve('tslint/lib/tslintCli.js');

const files = process.argv.slice(2);

runTsLintOnFilesGroupedPerPackage(groupFilesByPackage(files));

/**
 * Since we have a tslint.json config file per package we need to respect this when running
 * tslint for staged files. To do this we group the files per package name. This function takes
 * a list of package names and returns an object with the package name as the key and the files
 * in that package as the value.
 *
 * @param {string[]} files
 * @returns {{[packageName: string]: string[]}}
 */
function groupFilesByPackage(files) {
  const rootDirectory = path.join(path.resolve(__dirname, '..', '..'), path.sep);

  return files
    .map(fileName => {
      const parts = fileName.replace(rootDirectory, '').split(path.sep);
      const packageRoot = [parts[0], parts[1]].join(path.sep);

      return [packageRoot, fileName];
    })
    .reduce((filesByPackage, [package, file]) => {
      if (path.dirname(package) === 'typings') {
        return filesByPackage; // ignore custom typings package
      }
      if (!filesByPackage[package]) {
        filesByPackage[package] = [];
      }
      filesByPackage[package].push(file);
      return filesByPackage;
    }, {});
}

/**
 * Runs tslint for the staged files in the packages that require it.
 * Excludes all API extractor files.
 *
 * @param {{[packageName: string]: string[]}} filesGroupedByPackage
 */
function runTsLintOnFilesGroupedPerPackage(filesGroupedByPackage) {
  // Log an empty line on error to make the tslint output look better
  console.log('');

  /** @type {[string, string[]][]} */
  // prettier-ignore
  const fileEntries = (/** @type {any} */ Object.keys(filesGroupedByPackage)
    .map(package => [package, filesGroupedByPackage[package]]));

  for (let [package, files] of fileEntries) {
    const tslintConfig = path.join(path.resolve(__dirname, '..', '..'), package, 'tslint.json');
    const filteredFiles = files.filter(f => !f.endsWith('.api.ts'));

    if (filteredFiles.length === 0) {
      continue;
    }

    spawnSync(process.execPath, [tslintPath, '--config', tslintConfig, '-t', 'stylish', '-r', rulesPath, ...filteredFiles], {
      stdio: 'inherit'
    });
  }
}
