// @ts-check
const { createConfig } = require('@fluentui/scripts/jest/jest-resources');

module.exports = createConfig({
  customConfig: {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!node_modules/**'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50,
      },
    },
    testEnvironment: 'node',
  },
});
