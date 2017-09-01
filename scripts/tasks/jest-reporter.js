const DefaultReporter = require('jest-cli/build/reporters/DefaultReporter');

/**
 * The purpose of this custom reporter is to prevent Jest from logging to stderr
 * when there are no errors.
 */
class JestReporter extends DefaultReporter {
  constructor(globalConfig) {
    super(globalConfig);
  }

  log(message) {
    process.stdout.write(message + '\n');
  }

}

module.exports = JestReporter;
