const commonConfig = require('@fluentui/internal-tooling/jest');

module.exports = {
  ...commonConfig,
  name: 'react-docs',
  moduleNameMapper: require('lerna-alias').jest()
};
