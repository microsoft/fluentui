import { baseConfig } from '@fluentui/scripts-cypress';

baseConfig.component.devServer.webpackConfig.module?.rules?.push({
  test: /\.(woff2?|ttf)$/,
  type: 'asset/resource',
});

export default baseConfig;
