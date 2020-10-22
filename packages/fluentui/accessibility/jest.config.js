module.exports = {
  ...require('@fluentui/scripts/jest'),
  name: 'accessibility',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
};
