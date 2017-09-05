const path = require('path');

module.exports = {
  createRawConfig: () => (
    {
      rootDir: 'lib',
      "testRegex": "(/__tests__/.*|\\.(test|spec))\\.js$",
    }
  ),
  createConfig: () => (
    {
      moduleNameMapper: {
        'ts-jest': path.resolve(__dirname, '../node_modules/ts-jest')
      },
      "transform": {
        ".(ts|tsx)": path.resolve(__dirname, '../node_modules/ts-jest/preprocessor.js')
      },
      "reporters": [
        path.resolve(__dirname, './jest-reporter.js')
      ],
      "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
      "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
      ]
    })
};
