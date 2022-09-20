const fs = require('fs-extra');
const path = require('path');
const configureYargs = require('../utils/configureYargs');
const { getResultsDir, readDirJson } = require('../utils/paths');

/**
 * @typedef {Object} CLIProcessResultsOptions
 * @property {string} scenario
 */

const command = 'process-results';

/**
 * @param {CLIProcessResultsOptions} argv
 */
const handler = argv => {
  const { scenario } = argv;

  const resultsDir = getResultsDir(scenario);
  const files = readDirJson(resultsDir);

  const browserData = {
    scenario,
    testCases: {},
  };
  for (const file of files) {
    const contents = fs.readFileSync(path.join(resultsDir, file), {
      encoding: 'utf8',
    });
    const json = JSON.parse(contents);
    const benchmark = json.benchmarks[0];
    const browser = benchmark.browser.name;

    const [, testCase, size] = benchmark.name.split(' - ');

    browserData.testCases[testCase] = browserData.testCases[testCase] || { sizes: {} };
    browserData.testCases[testCase].sizes[size] = browserData.testCases[testCase].sizes[size] || { browsers: {} };

    browserData.testCases[testCase].sizes[size].browsers[browser] = json.benchmarks.map(bm => {
      const [bmTarget, bmTestCase, bmSize] = bm.name.split(' - ');

      return {
        name: bm.name,
        mean: bm.mean,
        differences: bm.differences,
        samples: bm.samples,
        target: bmTarget,
        testCase: bmTestCase,
        size: bmSize,
      };
    });
  }

  const js = `
      export const data = ${JSON.stringify(browserData, null, 4)};
  `;

  fs.writeFileSync(path.join(resultsDir, 'processed-results.js'), js, { encoding: 'utf8' });
};

/** @type {import('yargs').CommandModule} */
const api = {
  command,
  describe: 'Processes test results for display with charts and graphs.',
  builder: yargs => {
    configureYargs(command, yargs);
  },
  handler,
};

module.exports = api;
