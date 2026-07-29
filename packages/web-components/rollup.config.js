import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import fastTaggedTemplates from 'rollup-plugin-fast-tagged-templates';

const plugins = [
  nodeResolve({ browser: true }),
  commonJS(),
  esbuild({
    tsconfig: './tsconfig.lib.json',
  }),
  fastTaggedTemplates(),
];

export default [
  {
    input: 'src/index-rollup.ts',
    output: [
      {
        file: 'dist/web-components.js',
        format: 'esm',
      },
      {
        file: 'dist/web-components.min.js',
        format: 'esm',
        plugins: [minify()],
      },
    ],
    context: 'window',
    plugins,
  },
  {
    input: 'src/index-all-rollup.ts',
    output: [
      {
        file: 'dist/web-components-all.js',
        format: 'esm',
      },
      {
        file: 'dist/web-components-all.min.js',
        format: 'esm',
        plugins: [minify()],
      },
    ],
    context: 'window',
    plugins,
  },
];
