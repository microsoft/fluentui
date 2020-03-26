module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-context-selector',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
};
