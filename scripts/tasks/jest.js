module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const execSync = require('../exec-sync');
  const findConfig = require('../find-config');

  const jestConfigPath = findConfig('jest.config.js');

  if (fs.existsSync(jestConfigPath)) {
    const jestPath = path.resolve(__dirname, '../node_modules/jest/bin/jest');

    const args = [
      `--config ${jestConfigPath}`,
      options.isProduction && '--coverage --runInBand',
      options.args
    ].filter(arg => !!arg).join(' ');

    const command = `node ${jestPath} ${args}`;

    execSync(command, undefined, path.dirname(jestConfigPath));
  }
};
