module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-component-ref',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
};
