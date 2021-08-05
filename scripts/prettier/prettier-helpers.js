// @ts-check
const path = require('path');
const fs = require('fs');
const execSync = require('../exec-sync');
const exec = require('../exec');
const findGitRoot = require('../monorepo/findGitRoot');

const repoRoot = findGitRoot();
const prettierBin = getPrettierBinary();
const prettierRulesConfig = path.join(repoRoot, 'prettier.config.js');
const prettierIgnorePath = path.join(repoRoot, '.prettierignore');

function getPrettierBinary() {
  const prettierPath = path.dirname(require.resolve('prettier'));
  const pkg = JSON.parse(fs.readFileSync(path.join(prettierPath, 'package.json'), 'utf-8'));

  return path.join(prettierPath, pkg.bin);
}

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

  // As of writing, Prettier's Node API (https://prettier.io/docs/en/api.html) only supports running
  // on a single file. So to easily format multiple files, we have to use the CLI.
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
  }

  return execSync(cmd);
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

  const sourcePath = `"${path.join(folderPath, nonRecursive ? '' : '**', '*')}"`;

  console.log(`Running prettier for ${sourcePath}`);

  return runPrettier([sourcePath], { runAsync, logErrorsOnly: true, check });
}

module.exports = { runPrettierForFolder, runPrettier };
