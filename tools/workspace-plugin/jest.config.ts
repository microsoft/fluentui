// @ts-check

export default {
  displayName: 'workspace-plugin',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', {}],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/tools/workspace-plugin',
} as import('@jest/types').Config.InitialOptions;
