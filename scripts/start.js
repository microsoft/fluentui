const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server-speedy');
const path = require('path');
const fs = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  {
    name: 'webpackConfig',
    alias: 'w',
    type: String
  }
];

const options = commandLineArgs(optionDefinitions);
let webpackConfigFilePath = 'webpack.serve.config.js';

if (options && options.webpackConfig) {
  webpackConfigFilePath = options.webpackConfig;
}

const configPath = path.resolve(process.cwd(), webpackConfigFilePath);

if (fs.existsSync(configPath)) {
  const webpackConfig = require(configPath);

  const compiler = webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    },
    open: true
  });
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
}
