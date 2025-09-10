import * as path from 'node:path';
import { baseConfig } from '@fluentui/scripts-cypress';
import { registerTsPaths } from '@fluentui/scripts-storybook';

import { getNodeModulesPath } from './config/utils';

const { usedNodeModulesPath } = getNodeModulesPath();

const tsConfigPath = path.resolve(__dirname, '../../tsconfig.base.v8.json');

const config = { ...baseConfig };

registerTsPaths({ config: config.component.devServer.webpackConfig, configFile: tsConfigPath });

config.component.devServer.webpackConfig.resolve ??= {};
config.component.devServer.webpackConfig.resolve.alias = {
  ...config.component.devServer.webpackConfig.resolve.alias,
  '@cypress/react': path.resolve(usedNodeModulesPath, './@cypress/react'),
  '@types/react': path.resolve(usedNodeModulesPath, './@types/react'),
  '@types/react-dom': path.resolve(usedNodeModulesPath, './@types/react-dom'),
  react: path.resolve(usedNodeModulesPath, './react'),
  'react-dom': path.resolve(usedNodeModulesPath, './react-dom'),
};

export default config;
