import base from './jest.config';

export default {
  ...base,
  displayName: 'react-compiler-analyzer-integration',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
};
