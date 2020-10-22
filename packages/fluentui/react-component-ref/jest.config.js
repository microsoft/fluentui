module.exports = {
  ...require('@fluentui/scripts/jest'),
  name: 'react-component-ref',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
};
