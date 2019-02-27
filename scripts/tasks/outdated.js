const { outdatedTask, selfUpdateTask } = require('just-scripts');

const options = {
  versionSpec: {
    'just-task': 'latest',
    'just-scripts': 'latest'
  }
};

exports.outdated = outdatedTask(options);
exports.selfupdate = selfUpdateTask(options);
