import * as path from 'path';
import * as fs from 'fs';
import { preset, task, series, TaskFunction } from '@fluentui/scripts-tasks';

preset();

/**
 * Task that renames a folder
 *
 * during build task simplification every cjs module output will be emitted under `lib-commonjs` folder.
 * because this package violates that rule and it docs specifies `lib` as public api in order
 * to not introduce breaking change into this legacy package we need this workaround.
 */
function renameFolder(options: { from: string; to: string }): TaskFunction {
  return done => {
    fs.renameSync(options.from, options.to);
    done();
  };
}

task(
  'build',
  series(
    'build:node-lib',
    renameFolder({
      from: path.join(process.cwd(), 'lib-commonjs'),
      to: path.join(process.cwd(), 'lib'),
    }),
  ),
).cached!();
