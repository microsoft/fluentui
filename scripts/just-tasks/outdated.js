const { outdatedTask, selfUpdateTask } = require('just-task-preset');

const options = {
  versionSpec: {
    'just-task': 'latest',
    'just-task-preset': 'latest',
    webpack: '^4.0.0',
    typescript: '~2.8.7'
  }
};

exports.outdated = outdatedTask(options);
exports.selfupdate = selfUpdateTask(options);
