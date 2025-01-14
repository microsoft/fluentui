// @ts-check

export default {
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', { exclude: '/node_modules/' }],
  },
  /**
   * NOTE: because @swc/types ships index.ts and has not properly set up the package.json "types" field, if we set 'ts' first, it will try to use the index.ts file and fail.
   */
  moduleFileExtensions: ['js', 'ts', 'html'],
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  transformIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  watchPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  coverageDirectory: '../../coverage/tools/workspace-plugin',
  setupFiles: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'node',
} as import('@jest/types').Config.InitialOptions;
