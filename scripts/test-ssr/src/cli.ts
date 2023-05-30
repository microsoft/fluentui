import chalk from 'chalk';
import yargs from 'yargs';

import { main } from './commands/main';
import { RenderError } from './utils/visitPage';

const argv = yargs(process.argv.slice(2))
  .usage('$0 <stories>', 'Run SSR tests for stories', builder =>
    builder.positional('stories', {
      describe: 'A string with a glob that contains story files',
      type: 'string',
    }),
  )
  .demandOption('stories')
  .strict().argv;

main(argv as { stories: string }).catch((err: Error) => {
  console.error('');
  console.error(chalk.bgRed.whiteBright(' @fluentui/test-ssr '));

  const customErrorMessage =
    err instanceof RenderError
      ? '  The reference error is below, you will see it in Devtools on the opened page.'
      : '  The test failed, the error below contains relevant information.';

  console.error(customErrorMessage);
  console.error('');
  console.error(err);

  process.exit(1);
});
