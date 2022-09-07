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

  const browserData = {};
  for (const file of files) {
    const contents = fs.readFileSync(path.join(resultsDir, file), {
      encoding: 'utf8',
    });
    const json = JSON.parse(contents);
    const benchmark = json.benchmarks[0];
    const browser = benchmark.browser.name;
    const testCase = benchmark.name.split('-')[1].trim();

    browserData[browser] = browserData[browser] || {};

    browserData[browser][testCase] = json.benchmarks.map(test => {
      return {
        name: test.name,
        mean: test.mean,
        differences: test.differences,
        samples: test.samples,
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
