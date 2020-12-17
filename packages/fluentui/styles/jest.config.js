const commonConfig = require('@uifabric/build/jest');

const config = commonConfig({
  name: 'styles',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
});

module.exports = config;
