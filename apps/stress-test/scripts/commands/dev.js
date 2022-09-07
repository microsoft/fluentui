const configureYargs = require('../utils/configureYargs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../webpack/webpack.config');

/**
 * @typedef {Object} CLIDevOptions
 * @property {string} griffelMode
 * @property {boolean} open
 * @property {string} mode
 */

const command = 'dev';

const shutdownServer = () => {
  if (server) {
    server.stop().then(() => {
      console.log('Webpack dev server shutdown.');
    });
  }
};

let server;

/**
 * @param {CLIDevOptions} argv
 */
const runServer = async argv => {
  const config = webpackConfig(undefined, argv);
  const compiler = webpack(config);

  const serverOptions = { ...config.devServer, open: argv.open };
  server = new WebpackDevServer(serverOptions, compiler);

  process.on('uncaughtException', shutdownServer);

  console.log('Starting Webpack dev server...');
  await server.start();
};

/** @type {import('yargs').CommandModule} */
const api = {
  command,
  describe: 'Run the app in development mode',
  builder: yargs => {
    configureYargs(command, yargs);
  },
  handler: argv => {
    runServer(argv);
  },
};

module.exports = api;
