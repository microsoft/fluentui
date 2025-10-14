import { baseConfig, baseWebpackConfig } from '@fluentui/scripts-cypress';
import { createStorybookWebpackConfig } from '@fluentui/scripts-webpack';

const config = { ...baseConfig };
const v8webpackConfig = createStorybookWebpackConfig(baseWebpackConfig);

// we need to remove scripts-cypress from aliases as we wanna keep node_modules resolution to make browser path work for `import { mount } from '@fluentui/scripts-cypress';`
config.component.devServer.webpackConfig = removeAliases(v8webpackConfig, [
  '@fluentui/scripts-cypress/',
  '@fluentui/scripts-cypress$',
]);

export default config;

function removeAliases(webpackConfig: typeof v8webpackConfig, aliases: string[]) {
  const alias = webpackConfig?.resolve?.alias ?? {};

  for (const key of Object.keys(alias)) {
    if (aliases.includes(key)) {
      delete (alias as Record<string, unknown>)[key];
    }
  }

  return webpackConfig;
}
