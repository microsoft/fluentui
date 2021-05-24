const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

module.exports = createConfig({
  moduleNameMapper: require('lerna-alias').jest(),
  setupFilesAfterEnv: ['./jest-setup.js'],
});
