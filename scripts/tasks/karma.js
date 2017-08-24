module.exports = function (options) {
  let path = require('path');
  let fs = require('fs');
  let karmaPath = path.join(process.cwd(), 'karma.config.js');

  if (fs.existsSync(karmaPath)) {
    const execSync = require('../exec-sync');

    execSync('gulp karma' + (options.isProduction ? ' --production' : ''));
  }
};
