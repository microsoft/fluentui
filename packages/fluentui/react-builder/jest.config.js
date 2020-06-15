module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-builder',
  moduleNameMapper: require('lerna-alias').jest(),
};
