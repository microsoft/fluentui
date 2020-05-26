const {
  preset,
  just: { task, series },
} = require('@uifabric/build');
const generateJsonTask = require('./tasks/generateJsonTask');

preset();

task('generate-json', generateJsonTask);

task('build', series('build:node-lib', 'generate-json')).cached();
