// @ts-check

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const { exclude: _, ...swcJestConfig } = JSON.parse(readFileSync(join(__dirname, '.swcrc'), 'utf-8'));
swcJestConfig.swcrc = false;

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: 'react-motion-stories',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  testEnvironment: 'node',
};
