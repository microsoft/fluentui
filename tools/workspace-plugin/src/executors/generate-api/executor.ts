import { PromiseExecutor } from '@nx/devkit';
import { GenerateApiExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<GenerateApiExecutorSchema> = async options => {
  console.log('Executor ran for GenerateApi', options);
  return {
    success: true,
  };
};

export default runExecutor;
