import { preset, task, series, copyTask } from '@fluentui/scripts-tasks';
import * as path from 'path';

preset();

function copyDts() {
  const packageDir = process.cwd();

  return copyTask({
    paths: [path.resolve(packageDir, 'src/jsx-runtime.d.ts'), path.resolve(packageDir, 'src/jsx-dev-runtime.d.ts')],
    dest: path.resolve(packageDir, 'dist'),
  });
}

task('build', series('build:react-components', copyDts)).cached?.();
