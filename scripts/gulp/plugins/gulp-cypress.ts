import sh from '../sh';

export type CypressPluginConfig = {
  serverUrl: string;
  rootDir?: string;
  testNamePattern?: string;
};

const cypress = (config: CypressPluginConfig) => cb => {
  process.env.NODE_ENV = 'test';
  process.env.CI = process.env.TF_BUILD ? 'true' : undefined;

  const configArguments = [`baseUrl=${config.serverUrl}`].filter(Boolean);

  const command = `yarn cypress run --config ${configArguments.join(',')}`;

  console.log(command);
  return sh(command);
};

export default cypress;
