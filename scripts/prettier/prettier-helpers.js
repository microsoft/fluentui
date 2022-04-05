// @ts-check
const path = require('path');
const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const findGitRoot = require('../monorepo/findGitRoot');

const repoRoot = findGitRoot();
const prettierBin = getPrettierBinary();
const prettierRulesConfig = path.join(repoRoot, 'prettier.config.js');
const prettierIgnorePath = path.join(repoRoot, '.prettierignore');

const prettierSupportedFileExtensionsByContext = {
  js: ['js', 'jsx', 'ts', 'tsx'],
  stylesheets: ['css', 'scss', 'less'],
  markdown: ['md', 'mdx'],
  others: ['html', 'json', 'yml'],
};

const prettierSupportedFileExtensions = Object.values(prettierSupportedFileExtensionsByContext).reduce(
  (acc, current) => {
    acc.push(...current);
    return acc;
  },
  [],
);

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

  const fileIsGlob = files.length === 1 && files[0].includes('*');

  const prettierSupportedFiles = fileIsGlob
    ? files
    : files.filter(file => {
        const ext = path.extname(file).replace('.', '');
        return prettierSupportedFileExtensions.includes(ext);
      });

  if (!prettierSupportedFiles.length) {
    // Exit if there are no supported files (otherwise it will hang forever waiting for stdin)
    return;
  }

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
    ...prettierSupportedFiles,
  ].join(' ');

  if (runAsync) {
    return spawn(cmd, { shell: true });
  }

  return spawnSync(cmd, { shell: true });
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

  const fileExtensions = `.{${prettierSupportedFileExtensions.join(',')}}`;
  const sourcePath = `"${path.join(folderPath, nonRecursive ? '' : '**', '*')}${fileExtensions}"`;

  console.log(`Running prettier for ${sourcePath}`);

  return runPrettier([sourcePath], { runAsync, logErrorsOnly: true, check });
}

module.exports = { runPrettierForFolder, runPrettier, prettierSupportedFileExtensionsByContext };
