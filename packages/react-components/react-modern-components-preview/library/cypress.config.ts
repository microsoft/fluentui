import { baseConfig, baseWebpackConfig } from '@fluentui/scripts-cypress';

const config = { ...baseConfig };

config.component.devServer.webpackConfig.module?.rules?.push({
  test: /\.module\.css$/,
  use: ['style-loader', { loader: 'css-loader', options: { modules: true } }],
});

export default config;
