let { createConfig } = require('../scripts/tasks/jest-resources');
let path = require('path');

const config = {
  moduleNameMapper: {
    'office-ui-fabric-react/lib/(.*)$': '<rootDir>/src/$1'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js)$',
  transform: {},
  testEnvironment: 'node'
};

module.exports = config;
