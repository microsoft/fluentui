const chalk = require('chalk');

const { isCI } = require('./is-ci');

main();

function main() {
  if (isCI()) {
    process.exit(0);
  }

  gettingStarted();
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
