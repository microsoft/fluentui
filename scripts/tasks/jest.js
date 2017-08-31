module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const execSync = require('../exec-sync');
  const findConfig = require('../find-config');

  const jestPath = path.resolve(__dirname, '../node_modules/jest/bin/jest');
  const jestConfigPath = findConfig('jest.config.js');

  if (fs.existsSync(jestConfigPath)) {
    const command = `node ${jestPath} --config ${jestConfigPath} ${options.args || ''}`;

    execSync(command, undefined, path.dirname(jestConfigPath));
  }
};
