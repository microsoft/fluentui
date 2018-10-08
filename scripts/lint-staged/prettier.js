const prettier = require('prettier');
const path = require('path');
const execSync = require('../exec-sync');

const files = process.argv.slice(2);

runPrettierOnStagedFiles(files);

/**
 *  Gets the prettier config path from the tslint package
 */
function getPrettierConfigPath() {
  return path.join(process.cwd(), 'packages', 'prettier-rules', 'prettier.config.js');
}

/**
 * Runs prettier on the files that are staged and need formatting.
 * The need for formatting is checked by prettier by calling prettier.check()
 *
 * @param {string[]} files Staged files passed in by lint-staged
 */
function runPrettierOnStagedFiles(files) {
  const prettierPath = 'node ' + path.resolve(path.join(__dirname, '..', 'node_modules', 'prettier', 'bin-prettier.js'));
  const prettierIgnorePath = path.resolve(path.join(__dirname, '..', '..', '.prettierignore'));

  // Get the config from @uifabric/prettier-rules
  const prettierConfigPath = getPrettierConfigPath();

  execSync(`${prettierPath} --config ${prettierConfigPath} --ignore-path "${prettierIgnorePath}" --write ${files.join(' ')}`);
}
