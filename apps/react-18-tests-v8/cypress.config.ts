import * as path from 'path';
import { baseConfig } from '@fluentui/scripts-cypress';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

registerTsPaths({
  configFile: path.resolve(__dirname, '../../tsconfig.base.v8.json'),
  config: baseConfig.component.devServer.webpackConfig,
});

export default baseConfig;

// TODO copied from scripts/storybook/utils - make it generic helper (out of SB domain)
function registerTsPaths(options: { configFile: string; config: import('webpack').Configuration }) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { config, configFile } = options;
  const tsPaths = new TsconfigPathsPlugin({
    configFile,
  });

  config.resolve = config.resolve ?? {};
  config.resolve.plugins = config.resolve.plugins ?? [];

  // remove existing to prevent multiple tspaths plugin
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof TsconfigPathsPlugin));

  config.resolve.plugins.push(tsPaths);

  return config;
}
