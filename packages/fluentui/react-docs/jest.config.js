module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-docs',
  moduleNameMapper: require('lerna-alias').jest()
};
