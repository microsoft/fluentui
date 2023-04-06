import { createPathAliasesConfig } from '@fluentui/scripts-storybook';
import { isEqual } from 'lodash';
import * as yargs from 'yargs';

const isExecutedFromCli = require.main === module;

if (isExecutedFromCli) {
  const argv = yargs
    .option('verify', {
      describe: 'Run check if ts base all is up to date. Used mostly on CI',
      type: 'boolean',
    })
    .help().argv;

  main(argv);
}

export function main(options?: yargs.Arguments<{ verify?: boolean }>) {
  const { verify = false } = options ?? {};

  const { mergedTsConfig, existingTsConfig, tsConfigAllFileName } = createPathAliasesConfig({
    relativeFolderPathFromRoot: '.',
    writeFileToDisk: verify === false,
  });

  if (verify && !isEqual(existingTsConfig, mergedTsConfig)) {
    throw new Error(`
      🚨 ${tsConfigAllFileName} is out of date.

      Please update it by running  'yarn ts-node --swc scripts/generators/generate-ts-base-all-json.ts'.
    `);
  }
}
