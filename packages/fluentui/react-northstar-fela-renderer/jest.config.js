module.exports = {
  ...require('@fluentui/scripts/jest'),
  name: 'react-northstar-fela-renderer',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
};
