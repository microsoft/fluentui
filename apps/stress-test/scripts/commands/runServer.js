const configureYargs = require('../utils/configureYargs');
const { startServer } = require('../utils/server');

/**
 * @typedef {Object} CLIServerOptions
 * @property {number} port
 * @property {string} root
 */

const command = 'serve';
<<<<<<< HEAD

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
=======
exports.command = command;
exports.describe = 'Runs a test HTTP server.';

exports.builder = yargs => {
  configureYargs(command, yargs);
};

/**
 *
 * @param {CLIServerOptions} argv
 */
exports.handler = argv => {
  startServer(argv);
};
>>>>>>> 76c9e7deb9 (stress-test: add cli application)
