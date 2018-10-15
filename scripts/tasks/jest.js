module.exports = function(options) {
  const path = require('path');
  const fs = require('fs');
  const exec = require('../exec-sync');
  const findConfig = require('../find-config');
  const jestConfigPath = findConfig('jest.config.js');
  const resolve = require('resolve');

  if (fs.existsSync(jestConfigPath)) {
    const jestPath = resolve.sync('jest/bin/jest');
    const customArgs = options && options.argv ? options.argv.slice(3).join(' ') : '';

    const args = [
      // Specify the config file.
      `--config ${jestConfigPath}`,

      // When there are no tests we still want to consider that a success.
      // packages like `variants` do not have any tests (yet).
      '--passWithNoTests',

      // Forces test results output highlighting even if stdout is not a TTY.
      '--colors',

      // On Travis, run tests in serial as supposedly, the free Travis build terminates if multiple processes are spun up.
      process.env.TRAVIS ? `--runInBand` : undefined,

      // In production builds, produce coverage information.
      (options.isProduction || process.env.TRAVIS) && '--coverage',

      // If the -u flag is passed, pass it through.
      options.argv && options.argv.indexOf('-u') >= 0 ? '-u' : '',

      // Pass in custom arguments.
      options.args
    ]
      .filter(arg => !!arg)
      .join(' ');

    const command = `node ${jestPath} ${args}`;

    return exec(command, undefined, path.dirname(jestConfigPath), process);
  }
};
