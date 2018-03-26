function findConfig(configName) {
  const fs = require('fs');
  const path = require('path');
  const rootPath = path.resolve('/');

  let cwd = process.cwd();

  while (cwd !== rootPath) {
    const configPath = path.join(cwd, configName);

    if (fs.existsSync(configPath)) {
      return configPath;
    }

    cwd = path.dirname(cwd);
  }

  return undefined;
}

module.exports = findConfig;
