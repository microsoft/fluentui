const path = require('path');

module.exports = {
  displayName: 'react-button',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { cwd: __dirname, configFile: './babel-jest.config.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/react-button',
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
};
