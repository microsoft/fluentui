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
  });

  describe('assertAllowedModules', () => {
    it('passes for allowlisted modules', () => {
      expect(() => assertAllowedModules(['react'], ['react', 'react-dom'])).not.toThrow();
    });

    it('ignores CSS module specifiers used by headless stories', () => {
      expect(() => assertAllowedModules(['react', './styles/button.module.css'], ['react', 'react-dom'])).not.toThrow();
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
