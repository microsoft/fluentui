// @ts-check
const path = require('path');
const fs = require('fs');
const execSync = require('../exec-sync');
const exec = require('../exec');
const readConfig = require('../read-config');

const prettierConfig = 'prettier.config.js';
const prettierIgnore = '.prettierignore';
const repoRoot = path.resolve(__dirname, '..', '..');
const prettierRulesConfig = path.join(repoRoot, 'packages', 'prettier-rules', prettierConfig);
const prettierIgnorePath = path.join(repoRoot, prettierIgnore);
const prettierBin = path.join(__dirname, '..', 'node_modules', 'prettier', 'bin-prettier.js');
/** Array of absolute project paths with prettier configs */
let projectsWithPrettierConfig;

function init() {
  if (projectsWithPrettierConfig) {
    return;
  }

  projectsWithPrettierConfig = [];
  const rushJson = readConfig('rush.json');
  if (rushJson) {
    // Check the root of each project for a custom prettier config, and save the project paths that have one
    for (const project of rushJson.projects) {
      const packagePath = path.resolve(repoRoot, project.projectFolder);
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
 * @returns A promise if run asynchronously, or nothing if run synchronously
 */
function runPrettier(files, configPath, runAsync) {
  const cmd = `node ${prettierBin} --config ${configPath} --ignore-path "${prettierIgnorePath}" --write ${files.join(' ')}`;
  console.log(cmd);
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
 */
function runPrettierForProject(projectPath) {
  init();

  const sourcePath = path.join(projectPath, '**', '*.{ts,tsx,js,jsx,json,scss,html,yml,md}');
  const configPath = projectsWithPrettierConfig.includes(projectPath) ? path.join(projectPath, prettierConfig) : prettierRulesConfig;
  runPrettier([sourcePath], configPath, true);
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

module.exports = { runPrettierForProject, runPrettierMultiProject };
