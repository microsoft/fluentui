const { createConfig } = require('@uifabric/build/jest/jest-resources');
const path = require('path');

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],

  moduleNameMapper: {
    '@fluentui/react-conformance/lib/(.*)$': '@fluentui/react-conformance/lib-commonjs/$1',
    '@fluentui/react-conformance$': '@fluentui/react-conformance/lib-commonjs/index',
  },
});

module.exports = config;
