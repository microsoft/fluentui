import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths';
import { build, BuildOptions } from 'esbuild';
import * as path from 'path';

const NODE_MAJOR_VERSION = process.versions.node.split('.')[0];

const commonOptions: BuildOptions = {
  bundle: true,
  jsx: 'transform',
  loader: {
    '.svg': 'dataurl',
  },
  // Used to resolve packages aliases in stories files.
  plugins: [TsconfigPathsPlugin({ tsconfig: path.resolve(__dirname, 'tsconfig.base.json') })],
};

type BuildConfig = {
  cjsEntryPoint: string;
  cjsOutfile: string;
  esmEntryPoint: string;
  esmOutfile: string;
};

export async function buildAssets(config: BuildConfig): Promise<void> {
  const { cjsEntryPoint, cjsOutfile, esmEntryPoint, esmOutfile } = config;

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

      inject: [require.resolve('../shims/module')],
      format: 'iife',
      target: 'chrome101',
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
