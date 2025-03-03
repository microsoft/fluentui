import { ExecutorContext } from '@nx/devkit';

import { VisualRegressionExecutorSchema } from './schema';
import executor from './executor';

const options: VisualRegressionExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('VisualRegression Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
