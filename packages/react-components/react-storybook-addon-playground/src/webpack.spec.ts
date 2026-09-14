import { filterRuntimeEntryAssets } from './webpack';

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
