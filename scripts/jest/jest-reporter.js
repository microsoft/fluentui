const DefaultReporter = require('@jest/reporters/build/default_reporter').default;

/**
 * The purpose of this custom reporter is to prevent Jest from logging to stderr
 * when there are no errors.
 */
class JestReporter extends DefaultReporter {
  constructor(...args) {
    super(...args);

    this._isLoggingError = false;
    this.log = message => {
      if (this._isLoggingError) {
        process.stderr.write(message + '\n');
      } else {
        process.stdout.write(message + '\n');
      }
    };
  }

  printTestFileFailureMessage(...args) {
    this._isLoggingError = true;
    super.printTestFileFailureMessage(...args);
    this._isLoggingError = false;
  }
}

module.exports = JestReporter;
