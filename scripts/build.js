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
}).then(() => executeTask(firstTasks, null));

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
/////////////////////////////////////////////////////////////////////////////////////////////////////
const fsx = require('fs-extra');
class ISizeAuditHelperTaskConfiguration {
  /**
   * If the repository is using Rush, drop size-audit files under this directory under common.
   */
  rushRootDropDirectory;

  /**
   * Optional path to a secondary directory where size audit files should be dropped.
   */
  secondaryDropDirectory;

  /**
   * If specified, analyze this locale for assemblies if it exists.
   */
  assemblyLocaleToAnalyze;
}
/**
 * The SizeAuditHelperTask records chunk sizes to be picked up by a build system as artifacts. The chunk sizes
 *  are monitored over time by the build system.
 */
export default class SizeAuditHelperTask extends PostBuildGulpTask {
  constructor() {
    super(
      'size-audit-helper',
      {}
    );
  }
}

function loadSchema() {
  return require('./size-audit-helper.schema.json');
}

function executeTask(gulp, completeCallback) {
  const dropDirectories;

  if (this.taskConfig.rushRootDropDirectory) {
    let rushRootDirectory;
    try {
      const rushConfiguration = RushConfiguration.loadFromDefaultLocation();
      if (rushConfiguration) {
        rushRootDirectory = path.join(rushConfiguration.rushJsonFolder, this.taskConfig.rushRootDropDirectory);
      }
    } catch (e) {
      // Ignore - this means we aren't in a rush repo
    }

    if (rushRootDirectory) {
      dropDirectories.push(rushRootDirectory);
    }
  }

  if (this.taskConfig.secondaryDropDirectory) {
    dropDirectories.push(this.taskConfig.secondaryDropDirectory);
  }

  if (dropDirectories.length === 0) {
    completeCallback('No drop directories have been specified. Unable to drop size audit files.');
    return;
  }

  const projectName = path.basename(this.buildConfig.rootPath);
  const result = {
    projectName,
    chunks: this._analyzeChunks(),
    assemblies: this._analyzeAssemblies()
  };

  const sizeFilePaths = dropDirectories.map(
    (dropDirectory) => path.join(dropDirectory, `${projectName}.json`)
  );

  this.logVerbose(`Dropping size-audit files in: ${sizeFilePaths.join(', ')}`);

  const fileContents = JSON.stringify(result);
  for (const sizeFilePath of sizeFilePaths) {
    fsx.ensureDirSync(path.dirname(sizeFilePath));
    fsx.writeFileSync(sizeFilePath, fileContents);
  }

  completeCallback();
}

/**
   * Gets the size of the "default" locale bundle file
   */
function _analyzeAssembly(assemblyBundle) {
  const defaultLocaleBundlePath = (
    assemblyBundle.entrypointFiles[this.taskConfig.assemblyLocaleToAnalyze || ASSEMBLY_LOCALE_TO_ANALYZE] ||
    assemblyBundle.entrypointFiles[ASSEMBLY_LOCALE_TO_ANALYZE] ||
    assemblyBundle.entrypointFiles[constants.defaultLocale]
  );

  return {
    actualSize: this._getFileSize(defaultLocaleBundlePath)
  };
}

function _getFileSize(filePath) {
  try {
    const stats = fsx.statSync(filePath);
    return stats.size;
  } catch (e) {
    this.logWarning(`Unable to get size of file "${filePath}"`);
    return -1;
  }
}
module.exports = ISizeAuditHelperTaskConfiguration;
