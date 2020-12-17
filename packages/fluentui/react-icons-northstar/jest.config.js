const commonConfig = require('@uifabric/build/jest');

const config = commonConfig({
  name: 'react-icons-northstar',
  moduleNameMapper: require('lerna-alias').jest(),
});

module.exports = config;
