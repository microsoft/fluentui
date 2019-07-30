// @ts-check
const path = require('path');
const fs = require('fs');
const execSync = require('../exec-sync');
const exec = require('../exec');

const prettierConfig = 'prettier.config.js';
const prettierIgnore = '.prettierignore';
const repoRoot = path.resolve(__dirname, '..', '..');
const prettierRulesConfig = path.join(repoRoot, 'packages', 'prettier-rules', prettierConfig);
const prettierIgnorePath = path.join(repoRoot, prettierIgnore);
const prettierBin = require.resolve('prettier/bin-prettier.js');
const getAllPackageInfo = require('../monorepo/getAllPackageInfo');
/** Array of absolute project paths with prettier configs */
let projectsWithPrettierConfig;

const prettierExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'scss', 'html', 'md'];

function init() {
  if (projectsWithPrettierConfig) {
    return;
  }

  projectsWithPrettierConfig = [];
  const projects = getAllPackageInfo();
  if (projects) {
    // Check the root of each project for a custom prettier config, and save the project paths that have one
    for (const project of Object.keys(projects)) {
      const info = projects[project];
      const packagePath = path.resolve(repoRoot, info.packagePath);
      if (fs.existsSync(path.join(packagePath, prettierConfig))) {
        projectsWithPrettierConfig.push(packagePath);
      }
    }
  }
}

/**
 * Run prettier for a given set of files with the given config.
 *
 * @param {string[]} files List of files for which to run prettier
 * @param {string} configPath Path to relevant prettier.config.js.
 * @param {boolean} [runAsync] Whether to run the command synchronously or asynchronously
 * @param {boolean} [logErrorsOnly] If true, log errors/warnings only. Otherwise log all output.
 * @returns A promise if run asynchronously, or nothing if run synchronously
 */
function runPrettier(files, configPath, runAsync, logErrorsOnly) {
  const cmd = [
    'node',
    prettierBin,
    '--config',
    configPath,
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
  init();

  if (!path.isAbsolute(projectPath)) {
    projectPath = path.join(repoRoot, projectPath);
  }

  const sourcePath = path.join(projectPath, '**', `*.{${prettierExtensions.join(',')}}`);
  const configPath = projectsWithPrettierConfig.includes(projectPath) ? path.join(projectPath, prettierConfig) : prettierRulesConfig;

  console.log(`Running prettier for ${sourcePath} using config ${configPath}`);

  return runPrettier([sourcePath], configPath, true, true);
}

/**
 * Runs prettier on the given list of files.
 *
 * @param {string[]} files Staged files passed in by lint-staged
 * @param {boolean} [runAsync] Whether to run the command synchronously or asynchronously
 * @returns A promise if run asynchronously, or nothing if run synchronously
 */
function runPrettierMultiProject(files, runAsync) {
  if (files.length === 0) {
    return runAsync ? Promise.resolve() : undefined;
  }

  init();

  // Buid a mapping from config file name to files for which that config applies
  const configMap = {};
  for (const file of files) {
    // Default to the repo-wide config
    let configPath = prettierRulesConfig;
    const absPath = path.resolve(repoRoot, file);
    for (const projectPath of projectsWithPrettierConfig) {
      // Check if this file is inside any of the projects with a custom config
      if (absPath.startsWith(projectPath)) {
        configPath = path.join(projectPath, prettierConfig);
        break;
      }
    }
    if (!configMap[configPath]) {
      configMap[configPath] = [];
    }
    configMap[configPath].push(file);
  }

  const configPaths = Object.keys(configMap);
  // Run all the prettier commands in sequence
  if (runAsync) {
    let promise = Promise.resolve();
    for (const configPath of configPaths) {
      promise = promise.then(() => runPrettier(configMap[configPath], configPath, true));
    }
    return promise;
  } else {
    for (const configPath of configPaths) {
      runPrettier(configMap[configPath], configPath);
    }
  }
}

module.exports = { runPrettierForProject, runPrettierMultiProject, prettierExtensions };
