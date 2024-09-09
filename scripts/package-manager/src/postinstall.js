const { spawnSync } = require('node:child_process');

const chalk = require('chalk');

const { isCI } = require('./is-ci');

main();

function main() {
  registerCustomGitHooksDirectory();

  if (isCI()) {
    process.exit(0);
  }

  gettingStarted();
}

function registerCustomGitHooksDirectory() {
  // git v2.9.0 supports a custom hooks directory. This means we just need to check in the hooks scripts.
  spawnSync('git', ['config', 'core.hooksPath', '.githooks']);
}

function gettingStarted() {
  const COMMAND_PREFIX = `${chalk.cyan('>')} ${chalk.inverse(chalk.bold(chalk.cyan(' GETTING STARTED ')))}`;

  console.log('\n');
  console.log(COMMAND_PREFIX);
  console.log(`✅ All dependencies are installed!`);
  console.log(`🎬 Start development via: ${chalk.yellow('yarn start')}`);
  console.log(
    `💡 Learn more about all the commands: https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/command-cheat-sheet.md`,
  );
}
