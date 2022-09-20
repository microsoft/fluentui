const fs = require('fs-extra');
const path = require('path');
const { getConfigDir, getResultsDir, ensureClean } = require('../utils/paths');
const configureYargs = require('../utils/configureYargs');
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
 * @property {TestOptions} testOptions
 * @property {string[]} renderers
 */

/**
 * @typedef {Object} ConfigResult
 * @property {string} testFile - Path to test configuration file.
 * @property {string} resultsFile - Path to where test results should be written.
 */

/**
 * @typedef {Record.<string, any>} TestOptions
 */

const command = 'build-test-config';

/**
 * @function buildTestConfig
 * @param {CLIBuildTestConfigOptions} options
 * @returns {ConfigResult[]} Paths to generated config files
 */
const buildTestConfig = options => {
  const { scenario, browsers, testCases, sampleSize, targets, sizes, port, testOptions, renderers } = options;
  const configDir = getConfigDir(scenario);
  ensureClean(configDir);

  const configs = [];

  for (const browser of browsers) {
    for (const testCase of testCases) {
      for (const size of sizes) {
        const json = makeConfigJson(
          scenario,
          browser,
          testCase,
          sampleSize,
          targets,
          size,
          testOptions,
          port,
          renderers,
        );
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
 * @param {string} size
 * @param {TestOptions} testOptions
 * @param {number} port
 * @param {string} renderer
 * @returns {string} Stringified JSON
 */
const makeConfigJson = (scenario, browser, testCase, sampleSize, targets, size, testOptions, port, renderers) => {
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

        expand: targets.flatMap(target => {
          const targetParams = target.includes('?') ? querystring.parse(target.substring(target.indexOf('?') + 1)) : {};
          const params = querystring.stringify({
            ...targetParams,
            test: testCase,
            fixtureName: `${size}_1`,
            ...testOptions,
          });

          const targetWithoutParams = target.substring(0, target.indexOf('?'));

          return {
            name: `${target} - ${testCase} - ${size}`,
            url: `${baseUrl}/${targetWithoutParams}/?${params}`,
          };
          // return renderers.map(renderer => {
          //   const params = querystring.stringify({
          //     test: testCase,
          //     fixtureName: `${size}_1`,
          //     rendererName: renderer,
          //     ...testOptions,
          //   });

          //   return {
          //     name: `${renderer}\n${target} - ${testCase} - ${size}`,
          //     url: `${baseUrl}/${target}/?${params}`,
          //   };
          // });
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
    buildTestConfig(argv);
  },
};

module.exports = {
  ...api,
  buildTestConfig,
};
