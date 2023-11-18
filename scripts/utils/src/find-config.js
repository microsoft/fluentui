/**
 * Find a config file path, starting in the current directory and looking up to the Git root directory
 * (which contain .git) or the drive root.
 * @param {string} configName - Config file name. If an absolute path, will be returned unmodified.
 * @param {string} [cwd] optional different cwd
 * @returns The config file's path, or undefined if not found
 */
function findConfig(configName, cwd) {
  if (!configName) {
    return undefined;
  }

  const fs = require('fs');
  const path = require('path');

  if (path.isAbsolute(configName)) {
    return configName;
  }

  const rootPath = path.resolve('/');
  cwd = cwd || process.cwd();
  let foundGitRoot = false;

  while (cwd !== rootPath && !foundGitRoot) {
    const configPath = path.join(cwd, configName);

    if (fs.existsSync(configPath)) {
      return configPath;
    }

    if (fs.existsSync(path.join(cwd, '.git'))) {
      foundGitRoot = true;
    }

    cwd = path.dirname(cwd);
  }

  return undefined;
}

exports.findConfig = findConfig;
