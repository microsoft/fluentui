/**
 * This config should be shared for all web-component packages.
 * Tracking issue - https://github.com/microsoft/fluentui/issues/33576
 */

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import fastTaggedTemplates from 'rollup-plugin-fast-tagged-templates';

export default [
  {
    input: 'src/index-rollup.ts',
    output: [
      {
        file: 'dist/chart-web-components.js',
        format: 'esm',
      },
      {
        file: 'dist/chart-web-components.min.js',
        format: 'esm',
        plugins: [minify()],
      },
    ],
    context: 'window',
    plugins: [
      nodeResolve({ browser: true }),
      commonJS(),
      esbuild({
        tsconfig: './tsconfig.lib.json',
      }),
      fastTaggedTemplates(),
    ],
  },
];
