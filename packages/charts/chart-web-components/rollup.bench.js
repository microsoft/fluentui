import { nodeResolve } from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import commonJS from 'rollup-plugin-commonjs';

const plugins = [nodeResolve({ browser: true }), commonJS(), esbuild({ tsconfig: './tsconfig.json' })];

export default [
  {
    input: {
      tokens: './src/utils/benchmark-dependencies/tokens.ts',
    },
    output: [
      {
        dir: './.tensile/benchmark-dependencies',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins,
  },
];
