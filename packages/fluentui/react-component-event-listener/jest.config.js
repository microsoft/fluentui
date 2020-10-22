module.exports = {
  ...require('@fluentui/scripts/jest'),
  name: 'react-component-event-listener',
  moduleNameMapper: require('lerna-alias').jest({
    directory: require('@fluentui/scripts/monorepo/findGitRoot')(),
  }),
};
