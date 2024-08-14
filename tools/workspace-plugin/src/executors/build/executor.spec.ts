import { ExecutorContext } from '@nx/devkit';

import { BuildExecutorSchema } from './schema';
import executor from './executor';

const options: BuildExecutorSchema = {};
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
