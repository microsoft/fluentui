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

/**
 * The taskMap maps names to task functions from the /tasks folder.
 * This makes it easy to get tasks by name.
 *
 * The taskList is a list of lists containing tasks to run. Each entry
 * the list is run sequentially, but the tasks in the inner lists
 * are run in parallel.
 *
 * ```
 * [
 *  // All the following will run in sequence
 *  ['sass'],
 *  ['copy'],
 *  ['webpack, 'tslint'] // <-- These two will run in parallel after 'copy' is complete
 * ]
 * ```
 */
const { taskList, taskMap } = getTaskListAndTaskMap(process);
const buildStartTime = new Date().getTime();
let hasFailures = false;

const tasksComplete = taskList.reduce((promise, tasks) => {
  // Run the `tasks` in parallel and wait for all of them them to complete using Promise.all
  return promise.then(() => Promise.all(tasks.map((task) => runTask(task))));
}, Promise.resolve());

tasksComplete.then(() => {
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
      .then(() => taskMap[task]({ isProduction, argv: process.argv }))
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

function loadTaskFunctions(tasks) {
  return flatten(tasks)
    .reduce((acc, taskName) => {
      acc[taskName] = require('./tasks/' + taskName);
      return acc;
    }, {});
}

function flatten(list) {
  return list.reduce((acc, tasks) => acc.concat(tasks));
}

// Filter disabled tasks if specified in the package.json.
function removeDisabledTasks(disabledTasks = []) {
  return tasks => tasks.filter(task => disabledTasks.indexOf(task) < 0);
}

function getTaskListAndTaskMap(process) {
  const allTasks = [
    ['copy'],
    ['sass'],
    ['ts', 'tslint', 'jest'],
    ['webpack']
  ];

  // Pre require all tasks functions so we do not do that when running the tasks
  const taskMap = loadTaskFunctions(allTasks);

  let taskList;

  // Checks if the user passed specific tasks to the build step.
  // This can be done as follows `npm run build -- copy sass`
  // In this case we reset the default task list and run only the
  // provided tasks.
  if (process.argv.length >= 3 && process.argv[2].indexOf('--') === -1) {
    const tasksToRun = process.argv.slice(2);
    const disabledTasks = flatten(allTasks).filter(task => tasksToRun.indexOf(task) === -1);
    console.log('disabled', disabledTasks);
    taskList = allTasks.map(removeDisabledTasks(disabledTasks));
  } else {
    // If no options were provided we'll run all the default tasks, unless they have been disabled.
    taskList = allTasks
      .map(removeDisabledTasks(package.disabledTasks))
  }

  return {
    taskList,
    taskMap
  };
}