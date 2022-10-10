let { createConfig, resolveMergeStylesSerializer } = require('@fluentui/scripts/jest/jest-resources');
let path = require('path');

const esModules = ['@d3-scale', 'd3-scale'].join('|');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer(), 'enzyme-to-json/serializer'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  /*moduleNameMapper: {
    // '^uuid$': '<rootDir>/node_modules/uuid/dist/index.js',
    '^d3-scale$': require.resolve('d3-scale'),
  },*/
});

module.exports = config;
