import { execSync } from 'child_process';
import { cpus } from 'os';
import { promisify } from 'util';

import { getAffectedPackages } from '@fluentui/scripts-monorepo';
import * as yargs from 'yargs';

const exec = promisify(execSync);

main().catch(err => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const cpusCount = cpus().length;
  const args = processArgs();
  const targetCount = args.target.length;

  const affectedPackages = Array.from(getAffectedPackages(args.base)).filter(projectName => {
    return ['@fluentui/noop'].indexOf(projectName) === -1;
  });

  const cmd = `nx run-many --parallel=${cpusCount} --target${targetCount > 1 ? 's' : ''}=${
    args.target
  } --projects=${affectedPackages}`;

  try {
    // @ts-expect-error - bad promisify type inference
    const result = await exec(cmd, { stdio: 'inherit' });
    console.log(result);
    console.log('✅ all tasks done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function processArgs() {
  const defaults = { base: 'origin/master' };

  return yargs
    .option('target', {
      type: 'array',
      demandOption: true,
    })
    .option('base', {
      type: 'string',
      default: defaults.base,
    })
    .version('1.0.0').argv;
}
