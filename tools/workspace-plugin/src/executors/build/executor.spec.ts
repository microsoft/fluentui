import { ExecutorContext } from '@nx/devkit';

import { BuildExecutorSchema } from './schema';
import executor from './executor';

const options: BuildExecutorSchema = {
  sourceRoot: 'src',
  outputPathRoot: 'libs/suite/text',
  moduleOutput: [
    {
      module: 'commonjs',
      outputPath: 'lib-commonjs',
    },
    {
      module: 'es6',
      outputPath: 'lib',
    },
  ],
  assets: [
    {
      input: 'libs/suite/text/src',
      output: 'dist/zoro',
      glob: '*.txt__tmpl__',
      substitutions: {
        __tmpl__: '',
      },
    },
  ],
  clean: true,
};

const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('Build Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
