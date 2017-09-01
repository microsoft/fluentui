const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { logStartTask, logEndTask, logEndBuild } = require('./logging');
const package = getPackage();

if (!package) {
  return;
}

const packageName = package.name;
const isProduction = process.argv.indexOf('--production') > -1;

let tasks = [
  'copy',
  'sass',
  'tslint',
  'ts',
  'karma',
  'jest',
  'webpack'
];

// Filter disabled tasks if specified in the package.json.
if (package.disabledTasks) {
  tasks = tasks.filter(task => package.disabledTasks.indexOf(task) < 0);
}

if (process.argv.length >= 3 && process.argv[2].indexOf('--') === -1) {
  tasks = [process.argv[2]];
}

let promise = Promise.resolve();
let hasFailures = false;
let buildStartTime = new Date().getTime();

tasks.forEach(task => {
  promise = promise.then(() => runTask(task));
});

promise.then(() => {
  if (hasFailures) {
    process.exitCode = 1;
  }
  logEndBuild(packageName, !hasFailures, buildStartTime);
});

function runTask(task) {
  let taskStartTime = new Date().getTime();

  return Promise.resolve()
    .then(() => !hasFailures && Promise.resolve()
      .then(() => logStartTask(packageName, task))
      .then(() => require('./tasks/' + task)({ isProduction }))
      .then(() => logEndTask(packageName, task, taskStartTime))
      .catch((e) => {
        hasFailures = true;
        logEndTask(packageName, task, taskStartTime, e);
      }));
}

function getPackage() {
  let packagePath = path.resolve(process.cwd(), 'package.json');

  if (fs.existsSync(packagePath)) {
    return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  }

  return undefined;
}