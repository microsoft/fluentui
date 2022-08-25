const configureYargs = require('../utils/configureYargs');
const { startServer } = require('../utils/server');

/**
 * @typedef {Object} CLIServerOptions
 * @property {number} port
 * @property {string} root
 */

const command = 'serve';
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
