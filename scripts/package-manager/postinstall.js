const { spawnSync } = require('child_process');
const chalk = require('chalk');

const COMMAND_PREFIX = `${chalk.cyan('>')} ${chalk.inverse(chalk.bold(chalk.cyan(' GETTING STARTED ')))}`;

main();

function main() {
  // git v2.9.0 supports a custom hooks directory. This means we just need to check in the hooks scripts.
  spawnSync('git', ['config', 'core.hooksPath', '.githooks']);

  console.log('\n');
  console.log(COMMAND_PREFIX);
  console.log('✅ All dependencies are installed! This repo no longer requires a build to start the inner loop.');
  console.log(`🎬 For inner loop development, run: ${chalk.yellow('yarn start')}`);
  console.log(`💡 To learn more about all the commands that this monorepo supports, see the wiki:

  https://github.com/microsoft/fluentui/wiki/Build-Commands
`);
}
