import { buildRuntimeEntrySource, filterRuntimeEntryAssets } from './webpack';

describe('filterRuntimeEntryAssets', () => {
  it('removes playground-only assets from Storybook HTML and preserves shared chunks', () => {
    const entrypoints = new Map([
      [
        'main',
        {
          getFiles: () => ['runtime~main.js', 'shared.js', 'main.js', 'shared.css'],
        },
      ],
      [
        'playground-runtime',
        {
          getFiles: () => [
            'runtime~playground-runtime.js',
            'react-dom-client.js',
            'shared.js',
            'playground-runtime.js',
            'shared.css',
            'playground.css',
          ],
        },
      ],
    ]);
    const data = {
      assets: {
        js: [
          'runtime~main.js',
          'shared.js',
          'main.js',
          'runtime~playground-runtime.js',
          'react-dom-client.js',
          'playground-runtime.js',
        ],
        css: ['shared.css', 'playground.css'],
      },
    };

    expect(filterRuntimeEntryAssets(entrypoints, data)).toEqual({
      assets: {
        js: ['runtime~main.js', 'shared.js', 'main.js'],
        css: ['shared.css'],
      },
    });
  });
});

describe('buildRuntimeEntrySource', () => {
  it('eagerly imports configured modules instead of using dynamic import()', () => {
    const source = buildRuntimeEntrySource({
      modules: {
        '@fluentui/react-components': '@fluentui/react-components',
        '@fluentui/react-icons': '@fluentui/react-icons',
      },
      setup: '/abs/playground.setup.tsx',
    });

    expect(source).toContain('import * as __pg_mod_0 from "@fluentui/react-components";');
    expect(source).toContain('import * as __pg_mod_1 from "@fluentui/react-icons";');
    expect(source).toContain('"@fluentui/react-components": () => Promise.resolve(__pg_mod_0)');
    expect(source).toContain('"@fluentui/react-icons": () => Promise.resolve(__pg_mod_1)');
    expect(source).not.toMatch(/\bimport\(/);
  });
});
