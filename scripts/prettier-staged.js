const prettier = require('prettier');
const path = require('path');
const execSync = require('./exec-sync');

const files = process.argv.slice(2);
const configMap = new Map();
const prettierPath = 'node ' + path.resolve(path.join(__dirname, 'node_modules', 'prettier', 'bin-prettier.js'));

runPrettierOnStagedFiles(files);

/**
 * Creates a function that checks if the file is formatted
 * according to the passed prettier config.
 *
 * @param {PrettierConfig} prettierConfig
 */
function fileNeedsFormatting(prettierConfig) {
  return function (fileName) {
    return prettier.check(fileName, prettierConfig) === false;
  }
}

/**
 *  Gets the prettier config path from the tslint package
 */
async function getPrettierConfigPath() {
  return path.join(process.cwd(), 'packages', 'office-ui-fabric-react-tslint', 'prettier.config.js');
}

/**
 * Resolve the config for the passed configPath
 * @param {string} configPath
 */
async function getPrettierConfig(configPath) {
  return await prettier.resolveConfig(configPath);
}

/**
 * Runs prettier on the files that are staged and need formatting.
 * The need for formatting is checked by prettier by calling prettier.check()
 *
 * @param {string[]} files Staged files passed in by lint-staged
 */
async function runPrettierOnStagedFiles(files) {
  // Get the config from office-ui-fabric-react-tslint
  const prettierConfigPath = getPrettierConfigPath();
  const prettierConfig = await getPrettierConfig(prettierConfigPath);

  const filesToFormat = files.filter(fileNeedsFormatting(prettierConfig));

  execSync(`${prettierPath} --config ${prettierConfigPath} --write ${filesToFormat.join(' ')}`);
}
