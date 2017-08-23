const isProduction = process.argv.indexOf('--production') > -1;
const chalk = require('chalk');
const { logStartTask, logEndTask } = require('./logging');

let tasks = [
  'copy',
  'sass',
  'tslint',
  'ts',
  'karma',
  'webpack'
];

if (process.argv.length >= 3 && process.argv[2].indexOf('--') === -1) {
  tasks = [process.argv[2]];
}

let promise = Promise.resolve();
let hasFailures = false;

tasks.forEach(task => {
  promise = promise.then(() => runTask(task));
});

promise.then(() => {
  if (hasFailures) {
    process.exitCode = 1;
  }
});

function runTask(task) {
  let start = new Date().getTime();

  return Promise.resolve()
    .then(() => !hasFailures && Promise.resolve()
      .then(() => logStartTask(task))
      .then(() => require('./tasks/' + task)({ isProduction }))
      .then(() => logEndTask(task, new Date().getTime() - start))
      .catch((e) => {
        hasFailures = true;
        logEndTask(task, new Date().getTime() - start, e);
      }));
}