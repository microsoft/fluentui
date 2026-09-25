// @ts-check

const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  applyTypesVersions,
  collectTypings,
  getExportTypesPath,
  getMonacoTypeScriptVersion,
  getSpecifiers,
  getSpecifiersWithRegex,
  parseSpecifier,
} = require('./collect-typings');

/**
 * @param {Record<string, string>} files
 */
function createFixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'playground-typings-'));

  for (const [relativePath, content] of Object.entries(files)) {
    const filePath = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
  }

  return root;
}

describe('collect-typings', () => {
  describe('getSpecifiers', () => {
    it('extracts imports, re-exports, dynamic imports and triple-slash references', () => {
      const content = `
        /// <reference path="./global.d.ts" />
        /// <reference types="node" />
        import * as React from 'react';
        import type { Foo } from "./foo";
        export * from './bar';
        export { Baz } from '@scope/baz';
        declare const x: import('csstype').Property.Color;
        import x = require('./legacy');
      `;

      const expected = [
        { kind: 'path', value: './global.d.ts' },
        { kind: 'types', value: 'node' },
        { kind: 'module', value: 'react' },
        { kind: 'module', value: './foo' },
        { kind: 'module', value: './bar' },
        { kind: 'module', value: '@scope/baz' },
        { kind: 'module', value: 'csstype' },
        { kind: 'module', value: './legacy' },
      ];

      expect(getSpecifiers(content)).toEqual(expect.arrayContaining(expected));
      expect(getSpecifiers(content)).toHaveLength(expected.length);
      expect(getSpecifiersWithRegex(content)).toEqual(expected);
      expect(getSpecifiers(content, null)).toEqual(expected);
    });

    it('ignores specifier-like text in comments and strings when TypeScript is available', () => {
      const content = `
        /**
         * @example
         * import { Button } from '@fluentui/react-button';
         */
        export declare const example = "export * from 'not-a-module'";
        export { Foo } from './foo';
      `;

      expect(getSpecifiers(content)).toEqual([{ kind: 'module', value: './foo' }]);
    });
  });

  describe('getMonacoTypeScriptVersion', () => {
    it('reads the TypeScript version bundled with monaco-editor', () => {
      expect(getMonacoTypeScriptVersion()).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('throws when the version cannot be detected', () => {
      const root = createFixture({ 'contribution.js': 'export {};' });

      expect(() => getMonacoTypeScriptVersion(path.join(root, 'contribution.js'))).toThrow(/Unable to detect/);
      fs.rmSync(root, { recursive: true, force: true });
    });
  });

  describe('parseSpecifier', () => {
    it('splits package name and sub path', () => {
      expect(parseSpecifier('react')).toEqual({ name: 'react', subpath: '' });
      expect(parseSpecifier('react/jsx-runtime')).toEqual({ name: 'react', subpath: 'jsx-runtime' });
      expect(parseSpecifier('@fluentui/react-components')).toEqual({
        name: '@fluentui/react-components',
        subpath: '',
      });
      expect(parseSpecifier('@fluentui/react-components/unstable')).toEqual({
        name: '@fluentui/react-components',
        subpath: 'unstable',
      });
    });
  });

  describe('getExportTypesPath', () => {
    it('reads nested import.types from an exports map', () => {
      expect(
        getExportTypesPath(
          {
            exports: {
              '.': { import: { types: './dist/index.d.ts', default: './lib/index.js' } },
              './button': { import: { types: './dist/button.d.ts', default: './lib/button.js' } },
            },
          },
          'button',
        ),
      ).toBe('dist/button.d.ts');
    });
  });

  describe('applyTypesVersions', () => {
    const packageJson = { typesVersions: { '<=5.0': { '*': ['ts5.0/*'] } } };

    it('maps paths when the TypeScript version matches', () => {
      expect(applyTypesVersions(packageJson, 'index.d.ts', '4.5.5')).toBe('ts5.0/index.d.ts');
      expect(applyTypesVersions(packageJson, 'jsx-runtime', '4.5.5')).toBe('ts5.0/jsx-runtime');
    });

    it('replaces every wildcard in the selected target', () => {
      const repeatedWildcard = { typesVersions: { '<=5.0': { '*': ['generated/*/fallback/*'] } } };

      expect(applyTypesVersions(repeatedWildcard, 'jsx-runtime', '4.5.5')).toBe(
        'generated/jsx-runtime/fallback/jsx-runtime',
      );
    });

    it('keeps paths when no range matches', () => {
      expect(applyTypesVersions(packageJson, 'index.d.ts', '5.4.0')).toBe('index.d.ts');
      expect(applyTypesVersions({}, 'index.d.ts', '4.5.5')).toBe('index.d.ts');
    });
  });

  describe('collectTypings', () => {
    it('collects the transitive closure of declaration files with virtual node_modules paths', () => {
      const root = createFixture({
        'node_modules/ui-lib/package.json': JSON.stringify({ name: 'ui-lib', typings: './dist/index.d.ts' }),
        'node_modules/ui-lib/dist/index.d.ts': `
          import * as React from 'react';
          export * from './button';
          export declare const version: string;
        `,
        'node_modules/ui-lib/dist/button.d.ts': `
          import type { Property } from 'style-lib';
          export declare const Button: (props: { color?: Property }) => null;
        `,
        'node_modules/ui-lib/unstable/package.json': JSON.stringify({ types: '../dist/unstable.d.ts' }),
        'node_modules/ui-lib/dist/unstable.d.ts': `export declare const unstable: true;`,
        'node_modules/ui-lib/dist/unused.d.ts': `export declare const unused: true;`,
        'node_modules/react/package.json': JSON.stringify({ name: 'react' }),
        'node_modules/@types/react/package.json': JSON.stringify({
          name: '@types/react',
          types: 'index.d.ts',
          typesVersions: { '<=5.0': { '*': ['ts5.0/*'] } },
        }),
        'node_modules/@types/react/index.d.ts': `export declare const modern: true;`,
        'node_modules/@types/react/ts5.0/index.d.ts': `
          /// <reference path="global.d.ts" />
          export declare const legacy: true;
        `,
        'node_modules/@types/react/ts5.0/global.d.ts': `declare namespace JSX {}`,
        'node_modules/style-lib/package.json': JSON.stringify({ name: 'style-lib' }),
        'node_modules/style-lib/index.d.ts': `export type Property = string;`,
      });

      const result = collectTypings({
        packageRoot: path.join(root, 'app'),
        entries: ['ui-lib', 'ui-lib/unstable', 'missing-lib'],
        typescriptVersion: '4.5.5',
      });

      expect(Object.keys(result.files).sort()).toEqual([
        'file:///node_modules/@types/react/package.json',
        'file:///node_modules/@types/react/ts5.0/global.d.ts',
        'file:///node_modules/@types/react/ts5.0/index.d.ts',
        'file:///node_modules/style-lib/index.d.ts',
        'file:///node_modules/style-lib/package.json',
        'file:///node_modules/ui-lib/dist/button.d.ts',
        'file:///node_modules/ui-lib/dist/index.d.ts',
        'file:///node_modules/ui-lib/dist/unstable.d.ts',
        'file:///node_modules/ui-lib/package.json',
        'file:///node_modules/ui-lib/unstable.d.ts',
        'file:///node_modules/ui-lib/unstable/package.json',
      ]);
      expect(JSON.parse(result.files['file:///node_modules/ui-lib/package.json'])).toEqual({
        name: 'ui-lib',
        types: './dist/index.d.ts',
      });
      expect(result.missing).toEqual(['missing-lib']);
      expect(result.sources).toHaveLength(10);
      expect(result.sources.every(source => fs.existsSync(source))).toBe(true);

      fs.rmSync(root, { recursive: true, force: true });
    });

    it('resolves subpath types from package.json exports and shims classic node resolution', () => {
      const root = createFixture({
        'node_modules/headless/package.json': JSON.stringify({
          name: 'headless',
          typings: './dist/index.d.ts',
          exports: {
            '.': { import: { types: './dist/index.d.ts', default: './lib/index.js' } },
            './button': { import: { types: './dist/button.d.ts', default: './lib/button.js' } },
          },
        }),
        'node_modules/headless/dist/index.d.ts': `export {};`,
        'node_modules/headless/dist/button.d.ts': `export declare const Button: () => null;`,
      });

      const result = collectTypings({
        packageRoot: path.join(root, 'app'),
        entries: ['headless', 'headless/button'],
        typescriptVersion: '4.5.5',
      });

      expect(result.missing).toEqual([]);
      expect(result.files['file:///node_modules/headless/dist/button.d.ts']).toContain('Button');
      expect(result.files['file:///node_modules/headless/button.d.ts']).toBe(`export * from "./dist/button";\n`);

      fs.rmSync(root, { recursive: true, force: true });
    });

    it('uses a resolvable root exports target before falling back to @types', () => {
      const root = createFixture({
        'node_modules/exports-only/package.json': JSON.stringify({
          name: 'exports-only',
          exports: { '.': { types: './dist/index.d.ts', default: './lib/index.js' } },
        }),
        'node_modules/exports-only/dist/index.d.ts': `export declare const source: 'package';`,
        'node_modules/@types/exports-only/package.json': JSON.stringify({
          name: '@types/exports-only',
          types: 'index.d.ts',
        }),
        'node_modules/@types/exports-only/index.d.ts': `export declare const source: 'fallback';`,
      });

      try {
        const result = collectTypings({
          packageRoot: path.join(root, 'app'),
          entries: ['exports-only'],
          typescriptVersion: '4.5.5',
        });

        expect(result.missing).toEqual([]);
        expect(result.files['file:///node_modules/exports-only/dist/index.d.ts']).toContain(`source: 'package'`);
        expect(result.files['file:///node_modules/exports-only/index.d.ts']).toBe(`export * from "./dist/index";\n`);
        expect(result.files['file:///node_modules/@types/exports-only/index.d.ts']).toBeUndefined();
      } finally {
        fs.rmSync(root, { recursive: true, force: true });
      }
    });

    it('applies typesVersions to export types so Monaco TS <=5.0 gets the legacy React tree', () => {
      const root = createFixture({
        'node_modules/@types/react/package.json': JSON.stringify({
          name: '@types/react',
          types: 'index.d.ts',
          typesVersions: { '<=5.0': { '*': ['ts5.0/*'] } },
          exports: {
            '.': {
              'types@<=5.0': { default: './ts5.0/index.d.ts' },
              types: { default: './index.d.ts' },
            },
            './jsx-runtime': {
              'types@<=5.0': { default: './ts5.0/jsx-runtime.d.ts' },
              types: { default: './jsx-runtime.d.ts' },
            },
          },
        }),
        'node_modules/@types/react/index.d.ts': `export declare const modern: true;`,
        'node_modules/@types/react/jsx-runtime.d.ts': `export declare const modernJsx: true;`,
        'node_modules/@types/react/ts5.0/index.d.ts': `
          /// <reference path="global.d.ts" />
          export declare const legacy: true;
        `,
        'node_modules/@types/react/ts5.0/global.d.ts': `declare namespace JSX {}`,
        'node_modules/@types/react/ts5.0/jsx-runtime.d.ts': `export declare const legacyJsx: true;`,
        'node_modules/react/package.json': JSON.stringify({
          name: 'react',
          exports: { '.': './index.js', './jsx-runtime': './jsx-runtime.js' },
        }),
        'node_modules/react/index.js': `module.exports = require('./cjs/react.development.js');`,
        'node_modules/react/cjs/react.development.js': `exports.createElement = () => {};`,
        'node_modules/react/jsx-runtime.js': `exports.jsx = () => {};`,
      });

      const result = collectTypings({
        packageRoot: path.join(root, 'app'),
        entries: ['react', 'react/jsx-runtime'],
        typescriptVersion: '4.5.5',
      });

      expect(result.missing).toEqual([]);
      expect(result.files['file:///node_modules/@types/react/ts5.0/index.d.ts']).toContain('legacy');
      expect(result.files['file:///node_modules/@types/react/ts5.0/global.d.ts']).toContain('namespace JSX');
      expect(result.files['file:///node_modules/@types/react/ts5.0/jsx-runtime.d.ts']).toContain('legacyJsx');
      expect(result.files['file:///node_modules/@types/react/jsx-runtime.d.ts']).toBe(
        `export * from "./ts5.0/jsx-runtime";\n`,
      );
      expect(result.files['file:///node_modules/@types/react/index.d.ts']).toBeUndefined();
      expect(Object.keys(result.files).some(file => file.endsWith('.js'))).toBe(false);
      expect(result.files['file:///node_modules/react/package.json']).toBeUndefined();

      fs.rmSync(root, { recursive: true, force: true });
    });

    it('prefers declarations beside JavaScript exports and relative imports', () => {
      const root = createFixture({
        'node_modules/adjacent/package.json': JSON.stringify({
          name: 'adjacent',
          exports: { types: './dist/index.d.ts', default: './dist/index.js' },
        }),
        'node_modules/adjacent/dist/index.js': `exports.runtime = true;`,
        'node_modules/adjacent/dist/index.d.ts': `
          export * from './button.js';
          export * from './common.cjs';
          export * from './module.mjs';
        `,
        'node_modules/adjacent/dist/button.js': `exports.Button = () => null;`,
        'node_modules/adjacent/dist/button.d.ts': `export declare const Button: () => null;`,
        'node_modules/adjacent/dist/common.cjs': `exports.common = true;`,
        'node_modules/adjacent/dist/common.d.cts': `export declare const common: true;`,
        'node_modules/adjacent/dist/module.mjs': `export const module = true;`,
        'node_modules/adjacent/dist/module.d.mts': `export declare const module: true;`,
        'node_modules/js-export/package.json': JSON.stringify({ name: 'js-export', exports: './index.js' }),
        'node_modules/js-export/index.js': `exports.runtime = true;`,
        'node_modules/js-export/index.d.ts': `export declare const typed: true;`,
        'node_modules/js-only/package.json': JSON.stringify({ name: 'js-only', exports: './index.js' }),
        'node_modules/js-only/index.js': `exports.runtime = true;`,
      });

      try {
        const result = collectTypings({
          packageRoot: root,
          entries: ['adjacent', 'js-export', 'js-only'],
          typescriptVersion: '4.5.5',
        });

        expect(result.missing).toEqual(['js-only']);
        expect(result.files['file:///node_modules/adjacent/dist/button.d.ts']).toContain('Button');
        expect(result.files['file:///node_modules/adjacent/dist/common.d.cts']).toContain('common');
        expect(result.files['file:///node_modules/adjacent/dist/module.d.mts']).toContain('module');
        expect(result.files['file:///node_modules/js-export/index.d.ts']).toContain('typed');
        expect(Object.keys(result.files).every(file => /\.d\.[cm]?ts$|\/package\.json$/.test(file))).toBe(true);
      } finally {
        fs.rmSync(root, { recursive: true, force: true });
      }
    });
  });
});
