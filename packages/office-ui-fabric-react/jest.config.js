let { createConfig } = require('../../scripts/tasks/jest-resources');
let path = require('path');

const config = createConfig({
  setupFiles: [
    path.resolve(__dirname, 'lib/common/tests.js')
  ]
});

module.exports = config;