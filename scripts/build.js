const runTasks = require('./run-task');

const withFormattingAndLinting = process.argv.indexOf('--lint') > -1

let tasks = [
  'copy',
  'sass',
  withFormattingAndLinting ? 'prettier' : undefined,
  withFormattingAndLinting ? 'tslint' : undefined,
  'ts',
  'jest',
  'webpack'
].filter(v => v);

runTasks(tasks);
