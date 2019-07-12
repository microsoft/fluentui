const {
  just: { taskPresets, task, series }
} = require('@uifabric/build');
const generateJsonTask = require('./tasks/generateJsonTask');

taskPresets.lib();

task('generate-json', generateJsonTask);
task('build', series('clean', 'ts:commonjs', 'generate-json')).cached();
