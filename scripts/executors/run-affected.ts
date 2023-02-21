import { execSync } from 'child_process';
import { promisify } from 'util';

import { getAffectedPackages } from '@fluentui/scripts-monorepo';
import * as yargs from 'yargs';

const exec = promisify(execSync);

main().catch(err => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const args = processArgs();

  const affectedPackages = Array.from(getAffectedPackages(args.base)).filter(projectName => {
    return ['@fluentui/noop'].indexOf(projectName) === -1;
  });

  const taskResults = args.target.map(target => {
    const cmd = `nx run-many --parallel=8 --target=${target} --projects=${affectedPackages}`;
    console.log(`running: ${cmd}`);
    // @ts-expect-error - bad promisify type inference
    return exec(cmd, { stdio: 'inherit' });
  });

  try {
    const result = await Promise.all(taskResults);
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
