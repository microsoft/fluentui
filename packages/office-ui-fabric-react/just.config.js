const { preset, just } = require('@uifabric/build');
const { task, series } = just;
module.exports = function() {
  preset();
  const buildTask = task('build');
  task('build', series(buildTask, 'verify-api-extractor'));
};
