const rimraf = require('rimraf').sync;
const path = require('path');

[
  'lib',
  'temp',
  'dist',
  'lib-amd',
  'lib-commonjs',
  'lib-es2015', // Keep this in clean for actually cleaning up legacy content.
  'coverage',
  'src/**/*.scss.ts'
].forEach(folder => {
  rimraf(path.resolve(process.cwd(), folder));
});