module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const execSync = require('../exec-sync');

  const jestPath = path.resolve(__dirname, '../node_modules/jest/bin/jest');
  const jestConfigPath = path.join(process.cwd(), 'jest.config.js');

  if (fs.existsSync(jestConfigPath)) {
    const command = `node ${jestPath} --config ${jestConfigPath} ${options.args || ''}`;

    execSync(command);
  }
};
