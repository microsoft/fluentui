import base from './jest.config';

export default {
  ...base,
  displayName: 'react-compiler-analyzer-differential',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['<rootDir>/differential/corpus.ts'],
};
