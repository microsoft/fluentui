import { PromiseExecutor } from '@nx/devkit';
import { VisualRegressionExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<VisualRegressionExecutorSchema> = async options => {
  console.log('Executor ran for VisualRegression', options);
  return {
    success: true,
  };
};

export default runExecutor;
