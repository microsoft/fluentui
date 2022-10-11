let { createConfig, resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer(), 'enzyme-to-json/serializer'],
  moduleNameMapper: {
    'd3-scale': 'd3-scale/dist/d3-scale.min.js',
    'd3-array': 'd3-scale/node_modules/d3-array/dist/d3-array.min.js',
    'd3-interpolate': 'd3-scale/node_modules/d3-interpolate/dist/d3-interpolate.min.js',
    'd3-color': 'd3-scale/node_modules/d3-color/dist/d3-color.min.js',
    'd3-format': 'd3-scale/node_modules/d3-format/dist/d3-format.min.js',
    'd3-time-format': 'd3-scale/node_modules/d3-time-format/dist/d3-time-format.min.js',
    'd3-time': 'd3-scale/node_modules/d3-time/dist/d3-time.min.js',
  },
});

module.exports = config;
