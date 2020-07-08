const { preset, just } = require('@uifabric/build');
const { task } = just;

preset();

// a11y-tests disabled until occasional local and CI timeout issue can be resolved.
// task('build', 'build:node-lib')).cached();
task('build', 'no-op');
