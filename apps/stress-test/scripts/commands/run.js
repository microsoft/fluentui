const processOptions = require('../utils/processOptions');
const configureYargs = require('../utils/configureYargs');
const { startServer, stopServer } = require('../utils/server');
const runTachometer = require('../utils/tachometer');
const { handler: processResults } = require('./processResults');
const { buildTestConfig } = require('./buildTestConfig');

/**
 * @typedef {Object} CLIRunOptions
 * @property {string} scenario
 * @property {string[]} testCases
 * @property {string[]} sizes
 * @property {string[]} browsers
 * @property {number} sampleSize
 * @property {string[]} targets
 * @property {boolean} useConfig
 * @property {boolean} processResults
 * @property {number} port
 * @property {string} root
 */

const command = 'run';
<<<<<<< HEAD

/**
=======
exports.command = command;
exports.describe = 'Builds configs and runs stress testing.';

exports.builder = yargs => {
  configureYargs(command, yargs);
};

/**
 *
>>>>>>> 76c9e7deb9 (stress-test: add cli application)
 * @param {ConfigResult[]} testConfigs
 * @param {CLIServerOptions} options
 */
const run = async (testConfigs, options) => {
  const { port, root } = options;
  await startServer({ port, root });
  await runTachometer(testConfigs);
};

/**
<<<<<<< HEAD
 * @param {CLIRunOptions} argv
 */
const handler = argv => {
=======
 *
 * @param {CLIRunOptions} argv
 */
exports.handler = argv => {
>>>>>>> 76c9e7deb9 (stress-test: add cli application)
  const options = processOptions(argv);

  const testConfigs = buildTestConfig(options);
  run(testConfigs, options).finally(() => {
    stopServer();

    if (options.processResults) {
      processResults(options);
    }
  });
};
<<<<<<< HEAD

/** @type {import('yargs').CommandModule} */
const api = {
  command,
  describe: 'Builds configs and runs stress testing.',
  builder: yargs => {
    configureYargs(command, yargs);
  },
  handler,
};

module.exports = api;
=======
>>>>>>> 76c9e7deb9 (stress-test: add cli application)
