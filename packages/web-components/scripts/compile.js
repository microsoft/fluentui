/* eslint-disable no-undef */

import { execSync } from 'child_process';
import chalk from 'chalk';

main();

function compile() {
  try {
    console.log(chalk.bold(`🎬 compile:start`));

    console.log(chalk.blueBright(`compile: generating design tokens`));
    execSync(`node ./scripts/generate-tokens`, { stdio: 'inherit' });

    console.log(chalk.blueBright(`compile: running tsc`));
    execSync(`tsc -p tsconfig.lib.json --rootDir ./src --baseUrl .`, { stdio: 'inherit' });

    console.log(chalk.bold(`🏁 compile:end`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function main() {
  compile();
}
