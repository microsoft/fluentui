import { build, BuildOptions } from 'esbuild';

const NODE_MAJOR_VERSION = process.versions.node.split('.')[0];

const commonOptions: BuildOptions = {
  bundle: true,
  jsx: 'transform',
  loader: {
    '.jpg': 'dataurl',
    '.png': 'dataurl',
    '.svg': 'dataurl',
    '.md': 'text',
  },
};

type BuildConfig = {
  cjsEntryPoint: string;
  cjsOutfile: string;
  esmEntryPoint: string;
  esmOutfile: string;

  chromeVersion: number;
};

export async function buildAssets(config: BuildConfig): Promise<void> {
  const { chromeVersion, cjsEntryPoint, cjsOutfile, esmEntryPoint, esmOutfile } = config;

  try {
    // Used for SSR rendering, see renderToHTML.js
    await build({
      ...commonOptions,

      entryPoints: [cjsEntryPoint],
      outfile: cjsOutfile,

      // External dependencies should not be bundled
      external: ['@griffel/core', '@griffel/react', 'react', 'react-dom', 'scheduler'],
      format: 'cjs',
      target: `node${NODE_MAJOR_VERSION}`,
    });

    // Used in generated bundle that will be server by a browser
    await build({
      ...commonOptions,

      entryPoints: [esmEntryPoint],
      outfile: esmOutfile,

      inject: [
        // @storybook/addon-actions has a condition based on "module", this works with Webpack, but it's not defined in
        // esbuild that causes ReferenceError.
        require.resolve('../shims/module'),
      ],
      format: 'iife',
      target: `chrome${chromeVersion}`,
    });
  } catch (e) {
    throw new Error(
      [
        'Failed to build assets with esbuild...',
        'Please check the errors output above (if present), it should contain useful information to fix the problem.',
        '\n',
        e.message,
      ].join(' '),
    );
  }
}
