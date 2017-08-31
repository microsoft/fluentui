const path = require('path');

module.exports = {
  createConfig: () => (
    {
      moduleNameMapper: {
        'ts-jest': path.resolve(__dirname, '../node_modules/ts-jest')
      },
      "transform": {
        ".(ts|tsx)": path.resolve(__dirname, '../node_modules/ts-jest/preprocessor.js')
      },
      "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
      "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
      ]
    })
};
