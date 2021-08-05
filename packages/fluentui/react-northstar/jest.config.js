const commonConfig = require('@fluentui/scripts/jest');

const config = commonConfig({
  name: 'react',
  moduleNameMapper: {
    // Legacy aliases, they should not be used in new tests
    '^src/(.*)$': `<rootDir>/src/$1`,
    'test/(.*)$': `<rootDir>/test/$1`,
  },
});
config.setupFilesAfterEnv = [...config.setupFilesAfterEnv, './jest-setup.js'];

module.exports = config;
