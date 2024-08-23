import { ExecutorContext } from '@nx/devkit';

import { TypeCheckExecutorSchema } from './schema';
import executor from './executor';

const options: TypeCheckExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('TypeCheck Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
