/* eslint-disable */
import { readFileSync } from 'node:fs';
const { join } = require('node:path');

const { exclude: _, ...swcJestConfig } = JSON.parse(readFileSync(join(__dirname, '.swcrc'), 'utf-8'));

if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

export default {
  displayName: 'api-metadata',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  coverageDirectory: '../../coverage/tools/api-metadata',
};
