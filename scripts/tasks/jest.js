module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const exec = require('../exec');
  const findConfig = require('../find-config');
  const jestConfigPath = findConfig('jest.config.js');
  const resolve = require('resolve');

  if (fs.existsSync(jestConfigPath)) {
    const jestPath = resolve.sync('jest/bin/jest');
    const customArgs = options && options.argv ? options.argv.slice(3).join(' ') : '';

    const args = [
      // Specify the config file.
      `--config ${jestConfigPath}`,

      '--passWithNoTests',

      // Run tests in serial (parallel builds seem to hang rush.)
      // On Windows, this is occasionally an issue: https://github.com/facebook/jest/issues/4444
      // Temporarily run sequentially on Windows until jest is upgraded.
      process.env.TRAVIS || process.platform === 'win32' ? `--runInBand` : undefined,

      // In production builds, produce coverage information.
      options.isProduction && '--coverage',

      // If the -u flag is passed, pass it through.
      (options.argv && options.argv.indexOf('-u') >= 0) ? '-u' : '',

      // Pass in custom arguments.
      options.args
    ].filter(arg => !!arg).join(' ');

    const command = `node ${jestPath} ${args}`;

    return exec(command, undefined, path.dirname(jestConfigPath), process);
  }
};
