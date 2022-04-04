const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const execSync = require('./exec-sync');
const { findGitRoot } = require('./monorepo/index');
const chalk = require('chalk');

const options = yargs.option('webpackConfig', { alias: 'w', type: 'string' }).argv;

const webpackConfigFilePath = options.webpackConfig || 'webpack.codepen.config.js';

const configPath = path.resolve(process.cwd(), webpackConfigFilePath);
const gitRoot = findGitRoot();

if (fs.existsSync(configPath)) {
  let ngrok;
  try {
    console.log("Attempting to npm link globally installed ngrok so it can be require'd");
    // This will probably install ngrok globally if it's not already present
    execSync('npm link ngrok@3', undefined, gitRoot);
    ngrok = require('ngrok');
  } catch (err) {
    // ngrok has a postbuild step which was slowing down yarn install, so it's been removed
    // from the repo dependency list (since this script is the only place it's used)
    console.error('This script requires a global install of ngrok: "npm i -g ngrok@3"');
    process.exit(1);
  }
  const webpackConfig = require(configPath);
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, webpackConfig.devServer);
  const port = webpackConfig.devServer.port || 8080;

  server.listen(port, '127.0.0.1', async () => {
    const url = await ngrok.connect({ port, host_header: 'localhost:' + port });
    console.log(`Starting server on http://${url}`);
    // Put the script tag in a big yellow box so it's easier to find
    const scriptTag = `  <script src="${url}/fluentui-react.js"></script>  `;
    const message = ['', '  Replace the @fluentui/react script tag in your codepen with this:', '', scriptTag, ''];
    console.log(chalk.bgYellowBright.bold(message.map(line => line.padEnd(scriptTag.length)).join('\n')));
  });
}
