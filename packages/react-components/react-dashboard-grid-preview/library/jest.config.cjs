// @ts-check
/* eslint-disable */

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const { exclude: _, ...swcJestConfig } = JSON.parse(readFileSync(join(__dirname, '.swcrc'), 'utf-8'));

if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: 'react-dashboard-grid-preview',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', swcJestConfig],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.cjs'],
  snapshotSerializers: ['@griffel/jest-serializer'],
};
