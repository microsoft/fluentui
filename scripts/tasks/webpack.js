module.exports = function (options) {
  let path = require('path');
  let fs = require('fs');
  let webpackConfigPath = path.join(process.cwd(), 'webpack.config.js');

  if (fs.existsSync(webpackConfigPath)) {
    // const execSync = require('./exec-sync');
    // execSync('webpack --config webpack.config.js' + (options.isProduction ? ' --production' : ''));

    const execSync = require('../exec-sync');

    execSync('gulp webpack' + (options.isProduction ? ' --production' : ''));
  }
};
