module.exports = {
  ...require('@fluentui/scripts/jest'),
  name: 'react-context-selector',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
};
