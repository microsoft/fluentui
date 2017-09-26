module.exports = function (options) {
  let path = require('path');
  let fs = require('fs');
  let karmaPath = path.resolve(__dirname, '../node_modules/karma/bin/karma');
  let karmaConfigPath = path.join(process.cwd(), 'karma.config.js');
  let debugRun = (process.argv.indexOf('--debug') > -1);

  if (fs.existsSync(karmaConfigPath)) {
    const execSync = require('../exec-sync');

    execSync(`node ${karmaPath} start ${karmaConfigPath} ${debugRun ? '--debug --single-run=false' : ''}`);
  }
};
