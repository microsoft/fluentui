const { preset, just } = require('@uifabric/build');
const { task, series } = just;

preset();
task('build', 'build:node-lib').cached();
