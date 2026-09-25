'use strict';

module.exports = {
  displayName: 'public-docsite-v9-fumadocs',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/vite-plugins/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      '@swc/jest',
      { swcrc: false, jsc: { parser: { syntax: 'typescript' }, target: 'es2022' }, module: { type: 'commonjs' } },
    ],
  },
  clearMocks: true,
  restoreMocks: true,
};
