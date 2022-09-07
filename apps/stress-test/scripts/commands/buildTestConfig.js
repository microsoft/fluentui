const fs = require('fs-extra');
const path = require('path');
const { getConfigDir, getResultsDir, ensureClean } = require('../utils/paths');
const configureYargs = require('../utils/configureYargs');
const getScenarioConfig = require('../utils/getScenarioConfig');
const processOptions = require('../utils/processOptions');
const querystring = require('querystring');

/**
 * @typedef {Object} CLIBuildTestConfigOptions
 * @property {string} scenario
 * @property {string[]} testCases
 * @property {string[]} sizes
 * @property {string[]} browsers
 * @property {number} sampleSize
 * @property {string[]} targets
 * @property {number} port
 */

/**
 * @typedef {Object} ConfigResult
 * @property {string} testFile - Path to test configuration file.
 * @property {string} resultsFile - Path to where test results should be written.
 */

const command = 'build-test-config';

/**
 * @function buildTestConfig
 * @param {CLIBuildTestConfigOptions} options
 * @returns {ConfigResult[]} Paths to generated config files
 */
const buildTestConfig = options => {
  const { scenario, browsers, testCases, sampleSize, targets, sizes, port } = options;
  const config = getScenarioConfig(scenario);
  const configDir = getConfigDir(scenario);
  ensureClean(configDir);

  const configs = [];

  for (const browser of browsers) {
    for (const testCase of testCases) {
      for (const size of sizes) {
        const json = makeConfigJson(scenario, browser, testCase, sampleSize, targets, size, config.sizes[size], port);
        const configName = [browser, testCase, size].join('.') + '.json';
        const configPath = path.join(configDir, configName);
        fs.writeFileSync(configPath, json, { encoding: 'utf8' });

        const resultsDir = getResultsDir(scenario);
        const configResult = {
          configDir,
          resultsDir,
          testFile: configPath,
          resultsFile: path.join(resultsDir, configName),
        };

        configs.push(configResult);
      }
    }
  }

  return configs;
};

/**
 * @function makeConfigJson
 * @param {string} scenario
 * @param {string} browser
 * @param {string} testCase
 * @param {number} sampleSize
 * @param {string[]} targets
 * @param {string[]} size
 * @param {TestOptions} testOptions
 * @returns {string} Stringified JSON
 */
const makeConfigJson = (scenario, browser, testCase, sampleSize, targets, size, testOptions, port) => {
  const baseUrl = `http://localhost:${port}`;
  const json = {
    $schema: 'https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json',
    sampleSize,
    timeout: 0,
    benchmarks: [
      {
        browser: {
          name: browser,
        },
        measurement: [
          {
            mode: 'performance',
            entryName: 'stress',
          },
        ],

        expand: targets.map(target => {
          const params = querystring.stringify({ test: testCase, ...testOptions });

          return {
            name: `${target} - ${testCase} - ${size}`,
            url: `${baseUrl}/${target}/${scenario}/?${params}`,
          };
        }),
      },
    ],
  };

  return JSON.stringify(json, null, 4);
};

/** @type {import('yargs').CommandModule} */
const api = {
  command,
  describe: 'Builds test configuration files.',
  builder: yargs => {
    configureYargs(command, yargs);
  },
  /**
   * @param {CLIBuildTestConfigOptions} argv
   */
  handler: argv => {
    const options = processOptions(argv);
    buildTestConfig(options);
  },
};

module.exports = {
  ...api,
  buildTestConfig,
};
