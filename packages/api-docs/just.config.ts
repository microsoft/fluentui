const {
  preset,
  just: { task, series }
} = require('@uifabric/build');
const generateJsonTask = require('./tasks/generateJsonTask');

preset();

task('generate-json', generateJsonTask);

task('build', series('clean', 'ts:commonjs-only', 'generate-json')).cached();
