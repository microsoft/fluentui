module.exports = {
  ...require('@fluentui/scripts/jest'),
  name: 'styles',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
};
