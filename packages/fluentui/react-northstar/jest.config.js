const commonConfig = require('@uifabric/build/jest');

module.exports = {
  ...commonConfig,
  name: 'react',
  moduleNameMapper: {
    ...require('lerna-alias').jest({
      directory: require('@uifabric/build/monorepo/findGitRoot')(),
    }),
    // Legacy aliases, they should not be used in new tests
    '^src/(.*)$': `<rootDir>/src/$1`,
    '^test/(.*)$': `<rootDir>/test/$1`,
  },
  setupFilesAfterEnv: [...commonConfig.setupFilesAfterEnv, './test/setup.ts'],
};
