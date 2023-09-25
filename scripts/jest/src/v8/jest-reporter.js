const { DefaultReporter } = require('@jest/reporters');

/**
 * The purpose of this custom reporter is to prevent Jest from logging to stderr
 * when there are no errors.
 */
class JestReporter extends DefaultReporter {
  /**
   *
   * @param  {ConstructorParameters<typeof DefaultReporter>} args
   */
  constructor(...args) {
    super(...args);

    this._isLoggingError = false;
    this.log = (/** @type {string} */ message) => {
      if (this._isLoggingError) {
        process.stderr.write(message + '\n');
      } else {
        process.stdout.write(message + '\n');
      }
    };
  }

  /**
   *
   * @param  {Parameters<DefaultReporter['printTestFileFailureMessage']>} args
   */
  printTestFileFailureMessage(...args) {
    this._isLoggingError = true;
    super.printTestFileFailureMessage(...args);
    this._isLoggingError = false;
  }
}

module.exports = JestReporter;
