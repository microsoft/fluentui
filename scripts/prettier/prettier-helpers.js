// @ts-check
const path = require('path');
const execSync = require('../exec-sync');
const exec = require('../exec');
const findGitRoot = require('../monorepo/findGitRoot');

const repoRoot = findGitRoot();
const prettierRulesConfig = path.join(repoRoot, 'prettier.config.js');
const prettierIgnorePath = path.join(repoRoot, '.prettierignore');
const prettierBin = require.resolve('prettier/bin-prettier.js');

const prettierExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'scss', 'html', 'md'];

/**
 * Run prettier for a given set of files.
 *
 * @param {string[]} files List of files for which to run prettier
 * @param {boolean} [runAsync] Whether to run the command synchronously or asynchronously
 * @param {boolean} [logErrorsOnly] If true, log errors/warnings only. Otherwise log all output.
 * @returns A promise if run asynchronously, or nothing if run synchronously
 */
function runPrettier(files, runAsync, logErrorsOnly) {
  const cmd = [
    'node',
    prettierBin,
    '--config',
    prettierRulesConfig,
    '--ignore-path',
    `"${prettierIgnorePath}"`,
    ...(logErrorsOnly ? ['--loglevel', 'warn'] : []),
    '--write',
    ...files
  ].join(' ');

  if (runAsync) {
    return exec(cmd, undefined, undefined, process);
  } else {
    execSync(cmd);
  }
}

/**
 * Runs prettier on all ts/tsx/json/js files in a project.
 *
 * @param {string} projectPath Path to the project root for which to run prettier
 * @returns {Promise<void>}
 */
function runPrettierForProject(projectPath) {
  if (!path.isAbsolute(projectPath)) {
    projectPath = path.join(repoRoot, projectPath);
  }

  const sourcePath = path.join(projectPath, '**', `*.{${prettierExtensions.join(',')}}`);

  console.log(`Running prettier for ${sourcePath}`);

  return runPrettier([sourcePath], true, true);
}

module.exports = { runPrettierForProject, runPrettier, prettierExtensions };
