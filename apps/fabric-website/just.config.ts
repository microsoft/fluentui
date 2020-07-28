const { preset, just } = require('@uifabric/build');
const { task, option } = just;
const { createInternalFlightConfigTask, createPublicFlightConfigTask } = require('./scripts/createFlightConfig');

preset();

option('baseCDNUrl', { default: './dist' });

task('create-internal-flight-config', createInternalFlightConfigTask());

task('create-public-flight-config', createPublicFlightConfigTask());
