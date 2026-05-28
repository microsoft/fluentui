/* eslint-disable no-undef */

import { execSync } from 'node:child_process';
import { cp, glob, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import chalk from 'chalk';

const SRC = 'src';
const OUT = 'dist/esm';

async function copySsrAssets() {
  const patterns = ['**/*.template.html', '**/*.styles.css'];
  let count = 0;

  for (const pattern of patterns) {
    for await (const file of glob(pattern, { cwd: SRC })) {
      const from = join(SRC, file);
      const to = join(OUT, file);
      await mkdir(dirname(to), { recursive: true });
      await cp(from, to);
      count++;
    }
  }

  console.log(chalk.dim(`compile: copied ${count} SSR asset${count === 1 ? '' : 's'} from ${SRC}/ → ${OUT}/`));
}

async function compile() {
  console.log(chalk.bold(`🎬 compile:start`));

  console.log(chalk.blueBright(`compile: generating design tokens`));
  execSync(`node ./scripts/generate-tokens`, { stdio: 'inherit' });

  console.log(chalk.blueBright(`compile: running tsc`));
  execSync(`tsc -p tsconfig.lib.json --rootDir ./src --baseUrl .`, { stdio: 'inherit' });

  console.log(chalk.blueBright(`compile: copying SSR assets`));
  await copySsrAssets();

  console.log(chalk.bold(`🏁 compile:end`));
}

compile().catch(err => {
  console.error(err);
  process.exit(1);
});
