#!/usr/bin/env node
import * as yargs from 'yargs';

yargs
  .scriptName('fluent')
  .usage('$0 <cmd> [args]')
  .command(
    'info <path>',
    'Generate an info JSON',
    yargs => {
      yargs.positional('path', {
        type: 'string',
        describe: 'A TSX component filepath.'
      });
    },
    argv => {
      console.log('describe:', argv.path);
      console.log('done!');
    }
  )
  .help().argv;
