module.exports = function (options) {
  const path = require('path');
  const fs = require('fs');
  const execSync = require('child_process').execSync;
  const jestPath = path.resolve(__dirname, '../node_modules/jest/bin/jest');
  const jestConfigPath = path.join(process.cwd(), 'jest.config.js');

  if (fs.existsSync(jestConfigPath)) {
    const command = `node ${jestPath} --config ${jestConfigPath} ${options.args || ''}`;
    const SEPARATOR = process.platform === 'win32' ? ';' : ':';
    const env = Object.assign({}, process.env);

    env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

    execSync(
      command,
      {
        cwd: process.cwd(),
        env: env,
        shell: true,
        stdio: [process.stdin, process.stdout, process.stdout]
      });

  }
};
