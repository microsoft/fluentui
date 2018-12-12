// @ts-check

const { task } = require('just-task');
const { webpackTask } = require('just-task-preset');

task('webpack', webpackTask());
