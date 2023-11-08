const fs = require('fs');

class CustomReporter {
  constructor(globalConfig, reporterOptions, reporterContext) {
    this._globalConfig = globalConfig;
    this._options = reporterOptions;
    this._context = reporterContext;
  }

  onRunComplete(testContexts, results) {
    console.log('Custom reporter output:');
    console.log('global config: ', this._globalConfig);
    console.log('options for this reporter from Jest config: ', this._options);
    console.log('reporter context passed from test scheduler: ', this._context);
    fs.unlink('D:/fluentui/packages/react-charting/src/components/Sparkline/SparklineBase.js', err => {});
  }

  // Optionally, reporters can force Jest to exit with non zero code by returning
  // an `Error` from `getLastError()` method.
  getLastError() {
    if (this._shouldFail) {
      return new Error('Custom error reported!');
    }
  }
}

module.exports = CustomReporter;
