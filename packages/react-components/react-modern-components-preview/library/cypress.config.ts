import { baseConfig } from '@fluentui/scripts-cypress';

baseConfig.component.devServer.webpackConfig.module?.rules?.push({
  test: /\.module\.css$/,
  use: ['style-loader', { loader: 'css-loader', options: { modules: true } }],
});

export default baseConfig;
