// Main configuration for Jest testing
// https://jestjs.io/docs/en/configuration.html

// Intentionally NOT using @fluentui/scripts here so others can more easily copy the setup.

const path = require('path');

const config = {
  // Rather than running against JS build output, Jest can run (semi-)directly against TS files
  // using ts-jest https://kulshekhar.github.io/ts-jest/
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },

  // Don't run ts-jest on these things
  transformIgnorePatterns: ['/node_modules/', '/lib-commonjs/', '\\.js$'],

  // Look for tests under these paths
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',
  // Excluding .d.ts files
  testPathIgnorePatterns: ['/node_modules/', '.*\\.d\\.ts'],

  // When importing a path without an extension, try extensions in this order
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Global test config
  setupFiles: [path.join(__dirname, 'config', 'tests.js')],

  // Snapshot serializer for components using merge-styles (optional)
  snapshotSerializers: ['@fluentui/jest-serializer-merge-styles'],

  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: {
        // Use commonjs modules only for testing
        module: 'commonjs',
      },
    },
  },

  testURL: 'http://localhost',

  // Fluent UI modules under /lib use ES module format, which Jest can't parse.
  // Remap all /lib imports to /lib-commonjs.
  // (More mappings may be needed depending on which files you import.)
  moduleNameMapper: {
    '^@fluentui/([^/]+)$': '@fluentui/$1/lib-commonjs/index',
    '^@fluentui/([^/]+)/lib/(.*)': '@fluentui/$1/lib-commonjs/$2',
  },
};

module.exports = config;
