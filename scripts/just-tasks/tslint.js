// @ts-check

const { task } = require('just-task');
const { tslintTask } = require('just-task-preset');

task('tslint', tslintTask());
