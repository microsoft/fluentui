import { PromiseExecutor } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<BuildExecutorSchema> = async options => {
  console.log('Executor ran for Build', options);
  return {
    success: true,
  };
};

export default runExecutor;
