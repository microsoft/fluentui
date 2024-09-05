import { PromiseExecutor } from '@nx/devkit';
import { VerifyPackagingExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<VerifyPackagingExecutorSchema> = async options => {
  console.log('Executor ran for VerifyPackaging', options);
  return {
    success: true,
  };
};

export default runExecutor;
