const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const { execSync } = require('child_process');
const chalk = require('chalk');

const { findGitRoot } = require('@fluentui/scripts-monorepo');

const options = yargs.option('webpackConfig', { alias: 'w', type: 'string' }).argv;

const webpackConfigFilePath = options.webpackConfig || 'webpack.codepen.config.js';

const configPath = path.resolve(process.cwd(), webpackConfigFilePath);
const gitRoot = findGitRoot();
if (fs.existsSync(configPath)) {
  /**
   * @type {any}
   */
  let ngrok;
  try {
    console.log("Attempting to npm link globally installed ngrok so it can be require'd");
    // This will probably install ngrok globally if it's not already present
    execSync('npm link ngrok@3 --force', { cwd: gitRoot, stdio: 'inherit' });
    // @ts-expect-error - no types for ngrok
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
  const port = 8080;
  server.listen(port, '127.0.0.1', async () => {
    if (!fs.existsSync('.codepen_auth')) {
      console.error(
        // eslint-disable-next-line @fluentui/max-len
        '\nngrok requires an authToken in a file named .codepen_auth. Create an ngrok account and simply paste your authToken in a file name .codepen_auth',
      );
      process.exit(1);
    }
    const ngrokAuthToken = fs.readFileSync('./.codepen_auth', 'utf8').replace(/(\r\n|\n|\r)/gm, '');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const url = await ngrok.connect({ authtoken: ngrokAuthToken, port, host_header: 'localhost:' + port });
    console.log(`Starting server on http://${url}`);
    // Put the script tag in a big yellow box so it's easier to find
    const scriptTag = `  <script src="${url}/react-charting.js"></script>  `;
    // eslint-disable-next-line @fluentui/max-len
    const message = [
      '',
      '  Replace the @fluentui/react-charting script tag in your codepen with this:',
      '',
      scriptTag,
      '',
    ];
    console.log(chalk.bgYellowBright.bold(message.map(line => line.padEnd(scriptTag.length)).join('\n')));
  });
}
