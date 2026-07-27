const path = require('path');

module.exports = {
  createV8Config: require('./jest.preset.v8'),
  /**
   * CSS Modules test infrastructure for Griffel → Tailwind converted packages.
   * Wire into a package jest.config.js as:
   *
   *   moduleNameMapper: { '\\.module\\.css$': cssModules.moduleNameMapperTarget },
   *   snapshotSerializers: [cssModules.snapshotSerializer],
   *
   * A repo-wide `jest.preset.js` mapper lands once more packages are converted
   * (migration/griffel-to-tailwind/reports/DECISIONS.md D9).
   */
  cssModules: {
    moduleNameMapperTarget: path.join(__dirname, 'css-modules/proxy.js'),
    snapshotSerializer: path.join(__dirname, 'css-modules/serializer.js'),
  },
};
