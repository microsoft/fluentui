const { preset, just } = require('@uifabric/build');
const { task } = just;

preset();

task('build', 'build:node-lib').cached();
