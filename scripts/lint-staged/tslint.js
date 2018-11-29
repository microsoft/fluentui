const execSync = require('../exec-sync');
const path = require('path');
const fs = require('fs');
const msCustomRulesMain = require.resolve('tslint-microsoft-contrib');
const rulesPath = path.dirname(msCustomRulesMain);
const tslintPath = 'node ' + path.resolve(__dirname, '../node_modules/tslint/lib/tslintCli');

const files = process.argv.slice(2);

runTsLintOnFilesGroupedPerPackage(groupFilesByPackage(files));

/**
 * Since we have a tslint.json config file per package we need to respect this when running
 * tslint for staged files. To do this we group the files per package name. This function takes
 * a list of package names and returns an object with the package name as the key and the files
 * in that package as the value.
 *
 * @param {string[]} files
 * @returns {[packageName: string]: string[]}
 */
function groupFilesByPackage(files) {
  const rootDirectory = path.join(path.resolve(__dirname, '..', '..'), path.sep);

  return files
    .map(fileName => {
      const parts = fileName.replace(rootDirectory, '').split(path.sep);
      const packageRoot = [parts[0], parts[1]].join(path.sep);

      return [packageRoot, fileName];
    })
    .reduce((acc, [package, file]) => {
      if (!acc[package]) {
        acc[package] = [];
      }
      acc[package].push(file);
      return acc;
    }, {});
}

/**
 * Runs tslint for the staged files in the packages that require it.
 * Excludes all API extractor files.
 *
 * @param {[packageName: string]: string[]} filesGroupedByPackage
 */
function runTsLintOnFilesGroupedPerPackage(filesGroupedByPackage) {
  // Log an empty line on error to make the tslint output look better
  console.log('');

  const fileEntries = Object.keys(filesGroupedByPackage).reduce((entries, package) => {
    entries.push([package, filesGroupedByPackage[package]]);
    return entries;
  }, []);

  for (let [package, files] of fileEntries) {
    const tslintConfig = path.join(path.resolve(__dirname, '..', '..'), package, 'tslint.json');
    let filteredFiles = files.filter(f => {
      return !f.endsWith('.api.ts');
    });

    if (filteredFiles.length === 0) {
      continue;
    }

    execSync(`${tslintPath} --config ${tslintConfig} -t stylish -r ${rulesPath} ${filteredFiles.join(' ')}`);
  }
}
