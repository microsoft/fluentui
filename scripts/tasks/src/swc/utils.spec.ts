import { stripIndents } from '@nx/devkit';

import { addJsExtensionToImports } from './utils';

describe(`utils`, () => {
  describe(`#addJsExtensionToImports`, () => {
    it(`should not transform anything if non supported module type is specified`, () => {
      const code = stripIndents`
        export { themeToTokensObject } from './themeToTokensObject';
      `;

      let actual = addJsExtensionToImports(code, 'umd');

      expect(actual).toEqual(code);

      actual = addJsExtensionToImports(code, 'amd');

      expect(actual).toEqual(code);

      actual = addJsExtensionToImports(code, 'systemjs');

      expect(actual).toEqual(code);
    });

    it(`should add .js extensions for esm`, () => {
      const code = stripIndents`
        export { themeToTokensObject } from './themeToTokensObject';
        export { tokens } from './tokens';
        export { typographyStyles } from './global/index.js';
      `;

      const actual = addJsExtensionToImports(code, 'es6');
      const expected = stripIndents`
        export { themeToTokensObject } from './themeToTokensObject.js';
        export { tokens } from './tokens.js';
        export { typographyStyles } from './global/index.js';
    `;

      expect(actual).toEqual(expected);
    });

    it(`should add .js extensions for commonjs`, () => {
      const code = stripIndents`
        const _themeToTokensObject = require("./themeToTokensObject");
        const _tokens = require("./tokens");
        const _index2 = require("./global/index.js");
      `;

      const actual = addJsExtensionToImports(code, 'commonjs');
      const expected = stripIndents`
        const _themeToTokensObject = require("./themeToTokensObject.js");
        const _tokens = require("./tokens.js");
        const _index2 = require("./global/index.js");
    `;

      expect(actual).toEqual(expected);
    });
  });
});
