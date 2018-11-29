/**
 * Find a config file path, starting in the current directory and looking up to the Git root directory
 * (which contains rush.json) or the drive root.
 * @param {string} configName - Config file name. If an absolute path, will be returned unmodified.
 * @param {boolean} [lookInCommon] - If true, check for the file under common/config/rush
 * @returns The config file's path, or undefined if not found
 */
function findConfig(configName, lookInCommon) {
  const fs = require('fs');
  const path = require('path');
  const rootPath = path.resolve('/');

  if (path.isAbsolute(configName)) {
    return configName;
  }

  let cwd = process.cwd();
  let foundGitRoot = false;

  while (cwd !== rootPath && !foundGitRoot) {
    const configPath = path.join(cwd, configName);

    if (fs.existsSync(configPath)) {
      return configPath;
    }

    if (fs.existsSync(path.join(cwd, 'rush.json'))) {
      foundGitRoot = true;

      const commonConfigPath = path.join(cwd, 'common/config/rush', configName);
      if (lookInCommon && fs.existsSync(commonConfigPath)) {
        return commonConfigPath;
      }
    }

    cwd = path.dirname(cwd);
  }

  return undefined;
}

module.exports = findConfig;
