import commonJS from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
import esbuild from 'rollup-plugin-esbuild';
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
        plugins: [terser()],
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
      filesize({
        showMinifiedSize: false,
        showBrotliSize: true,
      }),
    ],
  },
];
