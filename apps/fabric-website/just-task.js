const preset = require('@uifabric/build/just-task');
const { task, option, chain } = preset.just;
const createFlightConfigTaskFactory = require('./scripts/createFlightConfig');

module.exports = function() {
  preset();
  option('buildNumber');
  option('buildName');
  option('baseCDNUrl');

  task(
    'create-flight-config',
    !process.env.BUILD_SOURCEBRANCH ? createFlightConfigTaskFactory('0', './dist', 'localbuild') : createFlightConfigTaskFactory()
  );

  chain('create-flight-config').after('build');
};
