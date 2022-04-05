// @ts-check

const micromatch = require('micromatch');
const fs = require('fs-extra');
const path = require('path');
const { ESLint } = require('eslint');
const constants = require('../tasks/eslint-constants');

/**
 * Run ESLint for certain files from a particular package.
 * `process.cwd()` is assumed to be the root of the package containing the files.
 *
 * Background: We can't just run the eslint CLI on the filenames because directly passed filenames
 * override ignores configured elsewhere (so files that should be ignored would be linted).
 * Also, the set of linted files per package may be different. So manually filter out ignored or
 * non-linted files then run eslint via its API [as described here](https://www.npmjs.com/package/lint-staged#how-can-i-ignore-files-from-eslintignore-).
 *
 * (The main lint-staged eslint.js runs this file in a subprocess per package to allow parallelization.)
 */
async function run() {
  // Get information needed to determine whether files in this package should be linted
  const packagePath = process.cwd();
  const packageJson = fs.readJSONSync(path.join(packagePath, 'package.json'));
  const lintScript = packageJson.scripts.lint || '';
  /** @type {import('eslint').ESLint} */
  let eslint;
  /** @type {string} */
  let includePattern;

  if (lintScript.includes('just')) {
    // For packages using just, match the extensions and subdirectory used by scripts/tasks/eslint.ts.
    // (Note that until we start linting all files in the package and can remove the constants.directory
    // segment here, the glob needs to start with the absolute package path in case someone has named
    // the directory containing all their git repos "src".)
    includePattern = path.join(packagePath, constants.directory, '**', `*{${constants.extensions}`);
    eslint = new ESLint({ fix: true, cache: true });
  } else {
    // Otherwise, look for the --ext option to determine extensions
    const extensionsMatch = lintScript.match(/--ext (\S+)/);
    const extensions = extensionsMatch ? extensionsMatch[1] : '.js';
    includePattern = `**/${extensions.includes(',') ? `*{${extensions}}` : `*${extensions}`}`;
    eslint = new ESLint({ fix: true, cache: lintScript.includes('--cache') });
  }

  // Filter out files with non-linted extensions
  const files = process.argv.slice(2).filter(file => micromatch.isMatch(file, includePattern));

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
    console.error(resultText);
    process.exit(1);
  }
}

run().catch(err => {
  console.log(err);
  process.exit(1);
});
