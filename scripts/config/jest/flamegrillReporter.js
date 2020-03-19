const chokidar = require('chokidar');
const os = require('os');
const path = require('path');
const fs = require('fs-extra');

const { processProfiles } = require('flamegrill/lib/process');

class FlamegrillReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
    this._watcher = null;
    this._logFiles = [];
  }

  onTestStart(test) {
    this._logFiles = [];
    this._watcher = chokidar.watch(path.join(os.tmpdir(), '*-puppeteer.log'), {
      ignoreInitial: true,
    });
    this._watcher.on('add', file => {
      this._logFiles.push(file);
    });
  }

  onTestResult(test, testResult, aggregatedResult) {
    this._watcher.close();

    const profiles = {};
    const numLogFiles = this._logFiles.length;
    const numTests = testResult.testResults.length;

    // there are just unused log files that get generated, we will shift by the "delta"
    const delta = numLogFiles - numTests;

    testResult.testResults.forEach((result, index) => {
      profiles[result.fullName.replace(/\s/g, '-')] = {
        logFile: this._logFiles[index + delta],
        metrics: {},
      };
    });
    (async () => {
      const root = process.cwd();

      const outDir = path.join(root, 'dist/flamegrill/output');
      const tempDir = path.join(root, 'dist/flamegrill/tmp');
      await fs.mkdirp(outDir);
      await fs.mkdirp(tempDir);
      const processed = await processProfiles(profiles, {
        outDir,
        tempDir,
      });

      console.log('Generated flamecharts: ');
      Object.keys(processed).forEach(scenario => {
        const result = processed[scenario];
        console.log(` - ${scenario}: ${result.output.flamegraphFile}`);
      });

      console.log();
    })();
  }
}

module.exports = FlamegrillReporter;
