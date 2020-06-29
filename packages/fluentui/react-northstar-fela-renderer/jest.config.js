module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-northstar-fela-renderer',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
};
