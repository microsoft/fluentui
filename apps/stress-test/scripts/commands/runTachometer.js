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

/**
 * @param {CLITachometerOptions} argv
 */
const handler = async argv => {
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

  await runTachometer(configs);
  console.log('Tachometer run complete!');
};

/** @type {import('yargs').CommandModule} */
const api = {
  command,
  describe: 'Runs Tachometer for a provided scenario.',
  builder: yargs => {
    configureYargs(command, yargs);
  },
  handler,
};

module.exports = api;
