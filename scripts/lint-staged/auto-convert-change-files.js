// @ts-check
const { spawnSync } = require('child_process');
const chalk = require('chalk').default;

const files = process.argv.slice(2);

if (files.length) {
  console.warn(chalk.red('Legacy change file(s) detected. Auto-converting these to the new format.'));
  const convertChangeFiles = require('../convert-change-files');
  convertChangeFiles();
  spawnSync('git', ['add', 'change', 'common/changes'], { stdio: 'inherit' });

  console.warn(chalk.green('Changes are completed for you. Please run git commit again!'));
  console.warn(
    chalk.cyan('In the future, please use "npm run change" to generate change files instead of "rush change"'),
  );

  process.exit(1);
}
