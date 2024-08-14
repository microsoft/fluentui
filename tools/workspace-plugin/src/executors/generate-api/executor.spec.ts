import { ExecutorContext } from '@nx/devkit';

import { GenerateApiExecutorSchema } from './schema';
import executor from './executor';

const options: GenerateApiExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('GenerateApi Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
