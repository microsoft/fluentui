/**
 * Jest moduleNameMapper target for *.module.css imports. Returns a deterministic
 * fuicm-prefixed name for any property read (see scripts/css-modules/ident.js); the
 * component/hash segments are dropped because the mapper cannot know which file was
 * imported. ./serializer.js strips these tokens from snapshots.
 */

const { generateTestIdent } = require('../../../css-modules/ident');

module.exports = new Proxy(
  {},
  {
    get(_target, key) {
      if (typeof key !== 'string') {
        return undefined;
      }

      // `default` is deliberately not excluded — it is a legitimate class name, and CJS
      // interop only reads __esModule.
      if (key === '__esModule' || key === 'then') {
        return undefined;
      }

      return generateTestIdent(key);
    },
  },
);
