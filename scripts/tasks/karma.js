module.exports = function (options) {
  let path = require('path');
  let fs = require('fs');
  let karmaPath = path.resolve('./node_modules/karma/bin/karma');
  let karmaConfigPath = path.join(process.cwd(), 'karma.config.js');

  if (fs.existsSync(karmaConfigPath)) {
    const execSync = require('../exec-sync');

    execSync(`node ${karmaPath} start ${karmaConfigPath}`);
  }
};
