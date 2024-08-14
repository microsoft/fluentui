import { ExecutorContext } from '@nx/devkit';

import { VerifyPackagingExecutorSchema } from './schema';
import executor from './executor';

const options: VerifyPackagingExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('VerifyPackaging Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
