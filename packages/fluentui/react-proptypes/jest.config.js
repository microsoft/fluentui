module.exports = {
  ...require('@uifabric/build/jest'),
  name: 'react-component-nesting-registry',
  moduleNameMapper: require('lerna-alias').jest(),
};
