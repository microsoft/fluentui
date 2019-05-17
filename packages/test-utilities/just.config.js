const { preset, just } = require('@uifabric/build');
const { task } = just;
module.exports = function() {
  preset();
  task('build', series('clean', 'ts'));
};
