/* eslint-disable */
export default {
  displayName: 'eslint-rules',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/tools/eslint-rules',
};
