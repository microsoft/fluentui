// module.exports = {
//   clearMocks: true,
//   testEnvironment: 'node',
//   testMatch: ['<rootDir>/src/**/__tests__/test/**/*.[jt]s?(x)', '<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)']
// };

let { createConfig } = require('@uifabric/build/jest/jest-resources');

const config = createConfig({
  testMatch: ['<rootDir>/src/**/__tests__/test/**/*.[jt]s?(x)', '<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)'],
  testRegex: undefined,
});

module.exports = config;
