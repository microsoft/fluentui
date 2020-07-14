// @ts-check

const path = require('path');
const { cleanTask } = require('just-scripts');
const glob = require('glob');

exports.clean = cleanTask(
  [
    'lib',
    'temp',
    'dist',
    'lib-amd',
    'lib-commonjs',
    'lib-es2015', // Keep this in clean for actually cleaning up legacy content.
    'coverage',
    'src/**/*.scss.ts',
    ...glob.sync('*.tsbuildinfo', { dot: true }),
  ].map(p => path.join(process.cwd(), p)),
);
