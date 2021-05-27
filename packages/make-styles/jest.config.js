const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

const config = createConfig({
  moduleNameMapper: require('lerna-alias').jest(),
});

module.exports = config;
