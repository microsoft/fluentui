import * as path from 'path';
import { baseConfig } from '@fluentui/scripts-cypress';

import { getNodeModulesPath } from './config/utils';

const { usedNodeModulesPath, workspaceRootNodeModulesPath } = getNodeModulesPath();

const config = { ...baseConfig };

config.component.devServer.webpackConfig.resolve ??= {};
config.component.devServer.webpackConfig.resolve.alias = {
  ...config.component.devServer.webpackConfig.resolve.alias,
  '@cypress/react': path.resolve(workspaceRootNodeModulesPath, './@cypress/react'),
  '@types/react': path.resolve(usedNodeModulesPath, './@types/react'),
  '@types/react-dom': path.resolve(usedNodeModulesPath, './@types/react-dom'),
  react: path.resolve(usedNodeModulesPath, './react'),
  'react-dom': path.resolve(usedNodeModulesPath, './react-dom'),
};

export default config;
