module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-bindings',
  moduleNameMapper: require('lerna-alias').jest(),
};
