module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'accessibility',
  moduleNameMapper: require('lerna-alias').jest(),
};
