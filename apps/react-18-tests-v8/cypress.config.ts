import * as path from 'node:path';
import { baseConfig } from '@fluentui/scripts-cypress';
import { registerTsPaths } from '@fluentui/scripts-storybook';

const tsConfigPath = path.resolve(__dirname, '../../tsconfig.base.v8.json');

const config = { ...baseConfig };

registerTsPaths({ config: config.component.devServer.webpackConfig, configFile: tsConfigPath });

config.component.devServer.webpackConfig.resolve ??= {};
config.component.devServer.webpackConfig.resolve.alias = {
  ...config.component.devServer.webpackConfig.resolve.alias,
  '@cypress/react': path.resolve(__dirname, './node_modules/@cypress/react'),
  '@types/react': path.resolve(__dirname, './node_modules/@types/react'),
  '@types/react-dom': path.resolve(__dirname, './node_modules/@types/react-dom'),
  react: path.resolve(__dirname, './node_modules/react'),
  'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
};

export default config;
