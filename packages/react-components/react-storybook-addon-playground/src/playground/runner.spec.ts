import * as React from 'react';

import type { ModuleLoader } from './modules';
import { PlaygroundError, assertAllowedModules, evaluate, getRequiredModules, pickComponent } from './runner';

const FakeButton = (props: { children?: React.ReactNode }) => React.createElement('button', null, props.children);

const loaders: Record<string, ModuleLoader> = {
  react: async () => React,
  'react/jsx-runtime': async () => import('react/jsx-runtime'),
  '@fluentui/react-components': async () => ({ Button: FakeButton }),
};

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

  describe('pickComponent', () => {
    const A = () => null;
    const B = () => null;

    it('prefers the default export', () => {
      expect(pickComponent({ default: A, Default: B })).toBe(A);
    });

    it('falls back to the "Default" export', () => {
      expect(pickComponent({ Default: B, Other: A })).toBe(B);
    });

    it('falls back to the first component-like export', () => {
      expect(pickComponent({ __esModule: true, meta: { title: 'Foo' }, Primary: A, Secondary: B })).toBe(A);
    });

    it('accepts memo / forwardRef components', () => {
      const Memo = React.memo(A);

      expect(pickComponent({ Memo })).toBe(Memo);
    });

    it('throws an export error when nothing renderable is exported', () => {
      const actual = () => pickComponent({ __esModule: true, value: 42 });

      expect(actual).toThrow(PlaygroundError);
      try {
        actual();
      } catch (error) {
        expect((error as PlaygroundError).kind).toBe('export');
      }
    });
  });

  describe('evaluate', () => {
    it('evaluates transpiled CommonJS code with allowlisted modules', async () => {
      const code = `
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Default = void 0;
        const React = require("react");
        const _reactComponents = require("@fluentui/react-components");
        const Default = () => React.createElement(_reactComponents.Button, null, "Hi");
        exports.Default = Default;
      `;

      const Component = await evaluate(code, loaders);

      expect(typeof Component).toBe('function');
      expect(Component.name).toBe('Default');
    });

    it('rejects non-allowlisted modules before evaluating anything', async () => {
      const code = `
        const _ = require("lodash");
        throw new Error("should not run");
      `;

      await expect(evaluate(code, loaders)).rejects.toMatchObject({ kind: 'import' });
    });

    it('wraps runtime errors thrown by user code', async () => {
      const code = `throw new TypeError("boom");`;

      await expect(evaluate(code, loaders)).rejects.toMatchObject({
        kind: 'runtime',
        message: 'TypeError: boom',
      });
    });

    it('reports missing exports', async () => {
      await expect(evaluate('exports.value = 1;', loaders)).rejects.toMatchObject({ kind: 'export' });
    });
  });
});
