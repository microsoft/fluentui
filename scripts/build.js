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

// Global variable to track the state of the build
let hasFailures = false;

const buildStartTime = new Date().getTime();

/**
 * Tasks with their prerequisites
 * ['sass', 'copy'] means that sass can run after copy has completed.
 * ['copy', null] means that copy can run immediately as it has no prerequisite.
 *
 * When a task is complete we find all tasks that follow the current task
 * and execute them until no tasks are left.
 */
const TASKS_WITH_PREREQUISITES = [
  ['copy', null],
  ['sass', 'copy'],
  ['ts', 'sass'],
  ['tslint', 'sass'],
  ['jest', 'sass'],
  ['webpack', 'ts']
];

/**
 * The taskMap maps names to task functions from the /tasks folder.
 * This makes it easy to get tasks by name.
 */
const taskMap = loadTaskFunctions(getAllTasks());

/**
 * Disabled tasks are:
 * All other tasks than the ones passed as a command line arguments
 *  or otherwise
 * the tasks disabled in the package.json.
 */
const disabledTasks = getDisabledTasks(process, package.disabledTasks);

// Get the first tasks to execute, these are the tasks without prerequisite.
const firstTasks = getNextTasks(null, disabledTasks);

// Start executing tasks, executeTasks will call itself recursively until all tasks are done
executeTasks(firstTasks).then(() => {
  if (hasFailures) {
    process.exitCode = 1;
  }
  logEndBuild(packageName, !hasFailures, buildStartTime);
}).then(() => executeTask());

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// Build helper functions
/////////////////////////////////////////////////////////////////////////////////////////////////////

function executeTasks(tasks) {
  return Promise.all(
    tasks.map(task => {
      return runTask(task).then(() => {
        const nextTasks = getNextTasks(task, disabledTasks);
        if (nextTasks.length) {
          return executeTasks(nextTasks);
        }
        return Promise.resolve();
      });
    })
  );
}

function runTask(task) {
  let taskStartTime = new Date().getTime();

  return Promise.resolve().then(
    () =>
      !hasFailures &&
      Promise.resolve()
        .then(() => logStartTask(packageName, task))
        .then(() => taskMap[task]({ isProduction, argv: process.argv }))
        .then(() => logEndTask(packageName, task, taskStartTime))
        .catch(e => {
          hasFailures = true;
          logEndTask(packageName, task, taskStartTime, e);
        })
  );
}

function getPackage() {
  let packagePath = path.resolve(process.cwd(), 'package.json');

  if (fs.existsSync(packagePath)) {
    return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  }

  return undefined;
}

function loadTaskFunctions(tasks) {
  return tasks.reduce((acc, taskName) => {
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

function getAllTasks() {
  return getTasksWithPrerequisites().map(first);
}

function getTasksWithPrerequisites() {
  return TASKS_WITH_PREREQUISITES;
}

function isEqualTo(a) {
  return b => a === b;
}

function removePrerequisitesThatMatch(disabledTasks) {
  return ([taskName, prerequisite]) => {
    // If the prerequisite is disabled we can start the task immediately
    if (disabledTasks.some(isEqualTo(prerequisite))) {
      return [taskName, null];
    }

    return [taskName, prerequisite];
  };
}

function removeDisabledTasks(tasks, disabledTasks) {
  return tasks
    .filter(([taskName, prerequisite]) => !disabledTasks.some(isEqualTo(taskName)))
    .map(removePrerequisitesThatMatch(disabledTasks));
}

function getNextTasks(currentTask, disabledTasks) {
  const wherePrerequisite = task => ([_, prerequisite]) => prerequisite === task;
  const tasks = removeDisabledTasks(getTasksWithPrerequisites(), disabledTasks);

  return tasks.filter(wherePrerequisite(currentTask)).map(([task]) => task);
}

function first(values) {
  return values[0];
}

function getDisabledTasks(process, defaultDisabled = []) {
  if (process.argv.length >= 3 && process.argv[2].indexOf('--') === -1) {
    const tasksToRun = process.argv.slice(2);

    return getAllTasks().filter(task => tasksToRun.indexOf(task) === -1);
  }

  return defaultDisabled;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// Artifact helper functions
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
   * Gets the size of the "default" locale bundle file
   */
function executeTask() {
  const projectName = path.basename(process.cwd());
  const sizeFilePath = path.join(process.cwd(), 'dist', `${projectName}.json`);
  if (fs.existsSync(path.dirname(sizeFilePath))) {
    const result = {
      chunks: analyzeChunks(),
    };
    const fileContents = JSON.stringify(result);
    fs.writeFileSync(sizeFilePath, fileContents);
  }
}

function analyzeChunks() {
  const distPath = path.join(process.cwd(), 'dist');
  const result = {};
  for (const filePath of fs.readdirSync(distPath)) {
    const fileName = path.basename(filePath);
    const extension = path.extname(fileName);
    if (extension.toLowerCase() === '.js') {
      result[fileName] = getFileSize(path.join(distPath, fileName));
    }
    return result;
  }
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  }
  catch (e) {
    console.log(`Unable to get size of file "${filePath}"`);
    return -1;
  }
}
