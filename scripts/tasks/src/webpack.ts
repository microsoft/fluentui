import { webpackCliTask, argv, logger } from 'just-scripts';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
import { getJustArgv } from './argv';

export function webpack() {
  const args = getJustArgv();
  return webpackCliTask({
    webpackCliArgs: args.production ? ['--mode=production'] : [],
    nodeArgs: ['--max-old-space-size=4096'],
    env: process.env,
  });
}

export function webpackDevServer(
  options: Partial<{
    /**
     * Open the default browser
     * @default 'true'
     */
    open: 'true' | 'false';
    /**
     * @default 'webpack.serve.config.js'
     */
    webpackConfig: string;
    /**
     * @default false
     */
    cached: boolean;
  }> = {},
) {
  return async () => {
    const args = { ...argv(), ...options };

    const fp = (await import('find-free-port')).default;
    const webpackConfigFilePath = args.webpackConfig || 'webpack.serve.config.js';
    const configPath = path.resolve(process.cwd(), webpackConfigFilePath);
    const port = await fp(4322, 4400);
    const openBrowser = args.open === 'false' ? '' : '--open';

    if (fs.existsSync(configPath)) {
      const webpackDevServerPath = require.resolve('webpack-dev-server/bin/webpack-dev-server.js');
      const cmd = `node ${webpackDevServerPath} --config ${configPath} --port ${port} ${openBrowser}`.trim();

      logger.info(`Caching enabled: ${args.cached ? 'YES' : 'NO'}`);
      logger.info('Running: ', cmd);

      process.env.cached = String(args.cached);

      execSync(cmd, { stdio: 'inherit' });
    }
  };
}
