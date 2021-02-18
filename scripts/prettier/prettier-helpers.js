// @ts-check
const path = require('path');
const execSync = require('../exec-sync');
const exec = require('../exec');
const findGitRoot = require('../monorepo/findGitRoot');

const repoRoot = findGitRoot();
const prettierRulesConfig = path.join(repoRoot, 'prettier.config.js');
const prettierIgnorePath = path.join(repoRoot, '.prettierignore');
const prettierBin = require.resolve('prettier/bin-prettier.js');

const prettierExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'scss', 'css', 'html', 'htm', 'md', 'yml'];

/**
 * Run prettier for a given set of files.
 *
 * @param {string[]} files - List of files for which to run prettier
 * @param {Object} config
 * @param {boolean=} config.runAsync - Whether to run the command synchronously or asynchronously
 * @param {boolean=} config.logErrorsOnly - If true, log errors/warnings only. Otherwise log all output.
 * @param {boolean=} config.check - run prettier in check mode
 * @returns A promise if run asynchronously, or nothing if run synchronously
 */
function runPrettier(files, config = {}) {
  const { check, logErrorsOnly, runAsync } = config;

  const cmd = [
    'node',
    prettierBin,
    '--config',
    prettierRulesConfig,
    '--ignore-path',
    `"${prettierIgnorePath}"`,
    ...(logErrorsOnly ? ['--loglevel', 'warn'] : []),
    check ? '--check' : '--write',
    ...files,
  ].join(' ');

  if (runAsync) {
    return exec(cmd, undefined, undefined, process);
  } else {
    execSync(cmd);
  }
}

/**
 * Runs prettier on all relevant files in a folder.
 *
 * @param {string} folderPath Path to the folder for which to run prettier
 * @param {Object} config
 * @param {boolean=} config.runAsync - Whether to run the command synchronously or asynchronously
 * @param {boolean=} config.nonRecursive - If true, don't add a multi-folder glob to the path.
 * @param {boolean=} config.check - run prettier in check mode
 * @returns A promise if run asynchronously, or nothing if run synchronously
 */
function runPrettierForFolder(folderPath, config = {}) {
  const { check, nonRecursive, runAsync } = config;
  if (!path.isAbsolute(folderPath)) {
    folderPath = path.join(repoRoot, folderPath);
  }

  const sourcePath = `"${path.join(folderPath, nonRecursive ? '' : '**', `*.{${prettierExtensions.join(',')}}`)}"`;

  console.log(`Running prettier for ${sourcePath}`);

  return runPrettier([sourcePath], { runAsync, logErrorsOnly: true, check });
}

module.exports = { runPrettierForFolder, runPrettier, prettierExtensions };
