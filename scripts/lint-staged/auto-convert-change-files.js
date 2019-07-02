// @ts-check
const { spawnSync } = require('child_process');
const chalk = require('chalk').default;
const fs = require('fs');

const files = process.argv.slice(2);

const legacyChangeFile = files.find(file => file.includes('common/changes'));

if (legacyChangeFile && fs.existsSync(legacyChangeFile)) {
  console.warn(chalk.yellow('Legacy change file detected, will auto convert these to the new format.'));

  const convertChangeFiles = require('../convert-change-files');
  convertChangeFiles();
  spawnSync('git', ['add', 'change', 'common/changes'], { stdio: 'inherit' });

  console.log(chalk.green('Changes are completed for you! Please run git commit again!'));
  console.log(chalk.cyan('Please use "npm run change" to generate change files instead of "rush change"'));

  process.exit(1);
}
