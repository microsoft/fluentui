// @ts-check
module.exports = {
  displayName: 'starter-templates',
  preset: '../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {}],
  },
  testMatch: ['<rootDir>/scripts/**/*.test.ts'],
  testEnvironment: 'node',
};
