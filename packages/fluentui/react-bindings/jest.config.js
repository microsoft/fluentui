module.exports = {
  ...require('@fluentui/scripts/jest'),
  name: 'react-bindings',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
};
