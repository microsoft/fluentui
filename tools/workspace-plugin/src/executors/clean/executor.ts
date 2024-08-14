import { PromiseExecutor } from '@nx/devkit';
import { CleanExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<CleanExecutorSchema> = async options => {
  console.log('Executor ran for Clean', options);
  return {
    success: true,
  };
};

export default runExecutor;
