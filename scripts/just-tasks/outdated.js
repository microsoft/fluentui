const { outdatedTask, selfUpdateTask } = require('just-task-preset');

const options = {
  versionSpec: {
    'just-task': 'latest',
    'just-task-preset': 'latest'
  }
};

exports.outdated = outdatedTask(options);
exports.selfupdate = selfUpdateTask(options);
