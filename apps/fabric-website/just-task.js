const preset = require('@uifabric/build/just-task');
const { task, option } = preset.just;
const { createInternalFlightConfigTask, createPublicFlightConfigTask } = require('./scripts/createFlightConfig');

module.exports = function() {
  preset();
  option('baseCDNUrl', { default: './dist' });
  task('create-internal-flight-config', createInternalFlightConfigTask());
  task('create-public-flight-config', createPublicFlightConfigTask());
};
