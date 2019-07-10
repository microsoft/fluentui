const { taskPresets, task, series, parallel } = require('just-scripts');
const generateJsonTask = require('./tasks/generateJsonTask');

taskPresets.lib();

task('generate-json', generateJsonTask);
task('build', series('clean', 'ts:commonjs', 'generate-json')).cached();
