// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  displayName: 'react-charts',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        isolatedModules: true,
      },
    ],
  },
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['./config/tests.js'],
  snapshotSerializers: ['@griffel/jest-serializer'],
  moduleNameMapper: {
    '^d3-scale$': '<rootDir>/../../../../node_modules/d3-scale/dist/d3-scale.js',
    '^d3-shape$': '<rootDir>/../../../../node_modules/d3-shape/dist/d3-shape.js',
    '^d3-path$': '<rootDir>/../../../../node_modules/d3-path/dist/d3-path.js',
    '^d3-array$': '<rootDir>/../../../../node_modules/d3-array/dist/d3-array.js',
    '^d3-axis$': '<rootDir>/../../../../node_modules/d3-axis/dist/d3-axis.js',
    '^d3-selection$': '<rootDir>/../../../../node_modules/d3-selection/dist/d3-selection.js',
    '^d3-format$': '<rootDir>/../../../../node_modules/d3-format/dist/d3-format.js',
    '^d3-time$': '<rootDir>/../../../../node_modules/d3-time/dist/d3-time.js',
    '^d3-time-format$': '<rootDir>/../../../../node_modules/d3-time-format/dist/d3-time-format.js',
    '^d3-interpolate$': '<rootDir>/../../../../node_modules/d3-interpolate/dist/d3-interpolate.js',
    '^d3-color$': '<rootDir>/../../../../node_modules/d3-color/dist/d3-color.js',
    '^d3-hierarchy$': '<rootDir>/../../../../node_modules/d3-hierarchy/dist/d3-hierarchy.js',
    '^d3-sankey$': '<rootDir>/../../../../node_modules/d3-sankey/dist/d3-sankey.js',
  },
};
