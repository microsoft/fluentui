// @ts-check

export default {
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', {}],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  transformIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  watchPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  moduleNameMapper: {
    '@swc/types': require.resolve('@swc/types'),
  },
  coverageDirectory: '../../coverage/tools/workspace-plugin',
  setupFiles: ['<rootDir>/jest-setup.js'],
} as import('@jest/types').Config.InitialOptions;
