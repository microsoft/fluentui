const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

module.exports = createConfig({
  setupFilesAfterEnv: ['./jest-setup.js'],
});
