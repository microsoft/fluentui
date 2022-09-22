import * as yargs from 'yargs';
import { CLIDevOptions } from '../utils/types';

import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

import configureYargs from '../utils/configureYargs';
const webpackConfig = require('../../webpack/webpack.config');

const command = 'dev';

const shutdownServer = () => {
  if (server) {
    server.stop().then(() => {
      console.log('Webpack dev server shutdown.');
    });
  }
};

let server: WebpackDevServer;

type RunServer = (argv: CLIDevOptions) => void;

const runServer: RunServer = async argv => {
  const config = webpackConfig(undefined, argv);
  const compiler = webpack(config);

  const serverOptions = { ...config.devServer, open: argv.open };
  server = new WebpackDevServer(serverOptions, compiler);

  process.on('uncaughtException', shutdownServer);

  console.log('Starting Webpack dev server...');
  await server.start();
};

const api: yargs.CommandModule = {
  command,
  describe: 'Run the app in development mode',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: argv => {
    const args = {
      griffelMode: argv.griffelMode as CLIDevOptions['griffelMode'],
      open: argv.open as boolean,
      mode: argv.mode as CLIDevOptions['mode'],
    };

    runServer(args);
  },
};

export default api;
