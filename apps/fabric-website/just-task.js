const preset = require('../../scripts/just-task');
const { task, option } = preset.just;
const createFlightConfigTaskFactory = require('./scripts/createFlightConfig');

module.exports = function() {
  preset();
  option('baseCDNUrl', { default: './dist' });
  task('create-flight-config', createFlightConfigTaskFactory());
};
