const fs = require('fs-extra');
const path = require('path');

const configureYargs = require('../utils/configureYargs');
const { getConfigDir, getResultsDir, readDirJson } = require('../utils/paths');
const runTachometer = require('../utils/tachometer');

/**
 * @typedef {Object} CLITachometerOptions
 * @property {string} scenario
 */

const command = 'tachometer';
exports.command = command;
exports.describe = 'Runs Tachometer for a provided scenario.';

exports.builder = yargs => {
  configureYargs(command, yargs);
};

const run = async testConfigs => {
  await runTachometer(testConfigs);
};

/**
 *
 * @param {CLITachometerOptions} argv
 */
exports.handler = argv => {
  const { scenario } = argv;

  const configDir = getConfigDir(scenario);
  const resultsDir = getResultsDir(scenario);

  if (!fs.existsSync(configDir)) {
    throw new Error(`"${configDir} does not exist.`);
  }

  const configs = [];
  const files = readDirJson(configDir);

  for (const file of files) {
    const configResult = {
      configDir,
      resultsDir,
      testFile: path.join(configDir, file),
      resultsFile: path.join(resultsDir, file),
    };

    configs.push(configResult);
  }

  run(configs).then(() => console.log('Tachometer run complete!'));
};
