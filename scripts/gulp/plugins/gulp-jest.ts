import sh from '../sh';

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

const jest = (config: JestPluginConfig) => cb => {
  process.env.NODE_ENV = 'test';

  // in watch mode jest never exits
  // let the gulp task complete to prevent blocking subsequent tasks
  const command = [
    `jest --config ${config.config}`,
    config.coverage && '--coverage',
    config.watchAll && '--watchAll',
    config.runInBand && '--runInBand',
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
