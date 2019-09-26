const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');

const options = yargs.option('webpackConfig', { alias: 'w', type: 'string' }).argv;

const webpackConfigFilePath = options.webpackConfig || 'webpack.codepen.config.js';

const configPath = path.resolve(process.cwd(), webpackConfigFilePath);

if (fs.existsSync(configPath)) {
  const ngrok = require('ngrok');
  const webpackConfig = require(configPath);
  const compiler = webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    }
  });
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, '127.0.0.1', async () => {
    const url = await ngrok.connect({ port: 8080, host_header: 'localhost:8080' });
    console.log(`Starting server on http://${url}`);
    console.log(
      `Add this to CodePen:
  <script type="text/javascript" src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script type="text/javascript" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script type="text/javascript" src="${url}/office-ui-fabric-react.js"></script>
`
    );
  });
}
