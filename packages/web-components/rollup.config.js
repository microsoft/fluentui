import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
import { transformCSSFragment, transformHTMLFragment } from './scripts/transform-fragments';

const parserOptions = {
  sourceType: 'module',
};

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
    plugins: [
      nodeResolve({ browser: true }),
      commonJS(),
      esbuild({
        tsconfig: './tsconfig.lib.json',
      }),
      transformTaggedTemplate({
        tagsToProcess: ['css'],
        transformer: transformCSSFragment,
        parserOptions,
      }),
      transformTaggedTemplate({
        tagsToProcess: ['html'],
        transformer: transformHTMLFragment,
        parserOptions,
      }),
    ],
  },
];
