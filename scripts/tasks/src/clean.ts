import * as path from 'path';
import { cleanTask } from 'just-scripts';
import * as glob from 'glob';

export const clean = cleanTask({
  paths: [
    'lib',
    'temp',
    'dist',
    'dist-storybook', // Keep this in clean for actually cleaning up legacy content.
    'lib-amd',
    'lib-commonjs',
    'lib-es2015', // Keep this in clean for actually cleaning up legacy content.
    'coverage',
    'src/**/*.scss.ts',
    ...glob.sync('*.tsbuildinfo', { dot: true }),
  ].map(p => path.join(process.cwd(), p)),
});
