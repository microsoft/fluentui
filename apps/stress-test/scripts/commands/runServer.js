const configureYargs = require('../utils/configureYargs');
const { startServer } = require('../utils/server');

/**
 * @typedef {Object} CLIServerOptions
 * @property {number} port
 * @property {string} root
 */

const command = 'serve';

/** @type {import('yargs').CommandModule} */
const api = {
  command,
  describe: 'Runs a test HTTP server.',
  builder: yargs => {
    configureYargs(command, yargs);
  },
  /**
   * @param {CLIServerOptions} argv
   */
  handler: argv => {
    startServer(argv);
  },
};

module.exports = api;
