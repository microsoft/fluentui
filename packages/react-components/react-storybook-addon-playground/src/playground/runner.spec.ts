import { PlaygroundError, assertAllowedModules, getRequiredModules } from './runner';

describe('runner', () => {
  describe('getRequiredModules', () => {
    it('extracts unique module specifiers from require() calls', () => {
      const code = `
        "use strict";
        const React = require("react");
        const _reactComponents = require('@fluentui/react-components');
        const _jsxRuntime = require( "react/jsx-runtime" );
        const again = require("react");
      `;

      expect(getRequiredModules(code)).toEqual(['react', '@fluentui/react-components', 'react/jsx-runtime']);
    });

    it('returns an empty array when nothing is required', () => {
      expect(getRequiredModules('module.exports = 1;')).toEqual([]);
    });

    it('ignores require-looking text that is not an executed call', () => {
      const code = `
        // require('comment')
        /* require('block-comment') */
        const text = "require('string')";
        const template = \`require('template')\`;
        const regex = /require("regex-literal")/;
        const regexWithCharacterClass = /[/]require('character-class')/gi;
        object.require('method');
        const actual = require(/* webpack comment */ 'react');
      `;

      expect(getRequiredModules(code)).toEqual(['react']);
    });

    it('extracts require() calls inside template literal substitutions', () => {
      const code = [
        'const version = `React ${require("react").version}`;',
        'const nested = `a ${`b ${require("react-dom").version} require("text")`} ${{ key: require(\'@scope/pkg\') }.key}`;',
        'const escaped = `\\${require("escaped")}`;',
        'const after = require("react/jsx-runtime");',
      ].join('\n');

      expect(getRequiredModules(code)).toEqual(['react', 'react-dom', '@scope/pkg', 'react/jsx-runtime']);
    });

    it('treats a slash after a control statement header or a block as a regex literal', () => {
      const code = [
        'if (enabled) /require("after-if")/.test(text);',
        'while (next()) /require("after-while")/g.exec(text);',
        'function run() {}',
        '/require("after-block")/.test(text);',
        'const ratio = (a + b) / require("divided-call").value / 2;',
        'const object = {} / require("after-object").value;',
        'const after = require("react");',
      ].join('\n');

      expect(getRequiredModules(code)).toEqual(['divided-call', 'after-object', 'react']);
    });

    it('scans unterminated regex-like input in linear time', () => {
      const code = `${'x = (/'.repeat(50_000)}\nrequire('react');`;
      const start = Date.now();

      expect(getRequiredModules(code)).toEqual(['react']);
      expect(Date.now() - start).toBeLessThan(1000);
    });
  });

  describe('assertAllowedModules', () => {
    it('passes for allowlisted modules', () => {
      expect(() => assertAllowedModules(['react'], ['react', 'react-dom'])).not.toThrow();
    });

    it('ignores CSS module specifiers used by headless stories', () => {
      expect(() => assertAllowedModules(['react', './styles/button.module.css'], ['react', 'react-dom'])).not.toThrow();
    });

    it('requires exact allowlist matches for scoped package subpaths', () => {
      expect(() => assertAllowedModules(['@scope/pkg/sub'], ['@scope/pkg'])).toThrow(PlaygroundError);
      expect(() => assertAllowedModules(['@scope/pkg/sub'], ['@scope/pkg/sub'])).not.toThrow();
    });

    it('throws an import error listing offending and allowed modules', () => {
      const actual = () => assertAllowedModules(['react', 'lodash', 'moment'], ['react', 'react-dom']);

      expect(actual).toThrow(PlaygroundError);
      try {
        actual();
      } catch (error) {
        expect((error as PlaygroundError).kind).toBe('import');
        expect((error as PlaygroundError).message).toBe(
          [
            'Cannot import "lodash", "moment". Only pre-installed dependencies are available in the playground:',
            '  - react',
            '  - react-dom',
          ].join('\n'),
        );
      }
    });
  });
});
