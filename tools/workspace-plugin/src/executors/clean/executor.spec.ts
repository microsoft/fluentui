import { ExecutorContext } from '@nx/devkit';

import { CleanExecutorSchema } from './schema';
import executor from './executor';

const options: CleanExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('Clean Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
