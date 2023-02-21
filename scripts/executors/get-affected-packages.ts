import { getAffectedPackages } from '@fluentui/scripts-monorepo';
import * as yargs from 'yargs';

type Options = yargs.Arguments<{
  base: string;
}>;

const args = processArgs();

main(args);

function main(options: Options) {
  const { base } = options;

  const affected = getAffectedPackages(base);

  return affected;
}

function processArgs() {
  const defaults = { base: 'origin/master' };

  return yargs
    .option('base', {
      type: 'string',
      default: defaults.base,
    })
    .version('1.0.0').argv;
}
