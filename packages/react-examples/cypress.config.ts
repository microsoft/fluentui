import { baseConfig, baseWebpackConfig } from '@fluentui/scripts-cypress';
import { createStorybookWebpackConfig } from '@fluentui/scripts-webpack';

const config = { ...baseConfig };
config.component.devServer.webpackConfig = createStorybookWebpackConfig(baseWebpackConfig);

export default config;
