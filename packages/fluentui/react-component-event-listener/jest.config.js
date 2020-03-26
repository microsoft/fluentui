module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-component-event-listener',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@uifabric/build/monorepo/findGitRoot')(),
  }),
};
