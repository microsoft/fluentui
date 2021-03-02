import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

const warningWhitelist = [
  'THIS_IS_UNDEFINED', // comes from TS transforms
  'CIRCULAR_DEPENDENCY', // we should fix all other circular imports
  'UNUSED_EXTERNAL_IMPORT', // to avoid throw on unused externals
];

export default {
  external: ['lodash', 'lodash/fp', 'prop-types', 'react', 'react-dom', 'react-is', 'scheduler'],
  input: 'app.js',
  onwarn: (warning, warn) => {
    if (warningWhitelist.includes(warning.code)) {
      warn(warning);
      return;
    }

    throw warning;
  },
  output: {
    file: 'bundle.js',
    format: 'iife',
    globals: {
      lodash: '_',
      'lodash/fp': 'fp',
      'prop-types': 'PropTypes',
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-is': 'ReactIs',
      scheduler: 'Scheduler',
    },
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/keyboard-key/src/keyboardKey.js': [
          'ArrowDown',
          'ArrowUp',
          'ArrowLeft',
          'ArrowRight',
          'PageDown',
          'PageUp',
          'Backspace',
          'Delete',
          'End',
          'Enter',
          'Escape',
          'Home',
          'getCode',
          'Spacebar',
          'Tab',
        ],
      },
    }),
    json({
      include: 'node_modules/**',
      preferConst: true,
      compact: true,
    }),
  ],
};
