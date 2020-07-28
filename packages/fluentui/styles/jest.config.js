module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'styles',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
};
