import { PromiseExecutor } from '@nx/devkit';
import { TypeCheckExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<TypeCheckExecutorSchema> = async options => {
  console.log('Executor ran for TypeCheck', options);
  return {
    success: true,
  };
};

export default runExecutor;
