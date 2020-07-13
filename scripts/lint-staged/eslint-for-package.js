// @ts-check

const { ESLint } = require('eslint');
const configHelpers = require('@fluentui/eslint-plugin/src/utils/configHelpers');

/**
 * Run ESLint for certain files from a particular package.
 * `process.cwd()` is assumed to be the root of the package containing the files.
 *
 * Background: We can't just run the eslint CLI on the filenames because directly passed filenames
 * override ignores configured elsewhere (so files that should be ignored would be linted).
 * So manually filter out ignored files then run eslint via its API [as described here](https://www.npmjs.com/package/lint-staged#how-can-i-ignore-files-from-eslintignore-).
 *
 * In our case, the main lint-staged eslint file runs this file in a subprocess per package because
 * some of our eslint config relies on process.cwd() to infer info about the package.
 */
async function run() {
  const files = process.argv.slice(2);

  const eslint = new ESLint({
    extensions: configHelpers.extensions,
    fix: true,
    cache: true,
  });

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
