import { sh } from '@fluentui/scripts-utils';

export type JestPluginConfig = {
  config: string;
  coverage?: boolean;
  detectLeaks?: boolean;
  maxWorkers?: number;
  rootDir?: string;
  runInBand?: boolean;
  testNamePattern?: string;
  testFilePattern?: string;
  verbose?: boolean;
  watchAll?: boolean;
};

const jest = (config: JestPluginConfig) => () => {
  process.env.NODE_ENV = 'test';
  // Alias env variables as Azure Pipelines do not set it
  process.env.CI = process.env.TF_BUILD ? 'true' : undefined;

  // in watch mode jest never exits
  // let the gulp task complete to prevent blocking subsequent tasks
  const command = [
    `jest --config ${config.config}`,
    config.coverage && '--coverage',
    config.watchAll && '--watchAll',
    config.runInBand && '--runInBand',
    // eslint-disable-next-line eqeqeq
    config.maxWorkers != null && `--maxWorkers=${config.maxWorkers}`,
    config.detectLeaks && '--detectLeaks',
    config.testNamePattern && `--testNamePattern="${config.testNamePattern}"`,
    config.rootDir && `--rootDir ${config.rootDir}`,
    config.verbose && '--verbose',
    config.testFilePattern, // !!! THIS ITEM MUST GO LAST IN THE ARRAY !!!
  ]
    .filter(Boolean)
    .join(' ');

  console.log(command);
  return sh(command);
};

export default jest;
