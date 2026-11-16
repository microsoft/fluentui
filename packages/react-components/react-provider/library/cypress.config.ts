import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { baseConfig } from '@fluentui/scripts-cypress';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { prepareConsumers, prepareDemo } from './testing/build-prefix-fixtures.cjs';

const webpackConfig: Configuration & { devServer?: DevServerConfiguration } = {
  ...baseConfig.component.devServer.webpackConfig,
};

const component: typeof baseConfig.component = {
  ...baseConfig.component,
  devServer: { ...baseConfig.component.devServer, webpackConfig },
  async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
    const aliases = webpackConfig.resolve?.alias;
    const reactAlias = aliases && !Array.isArray(aliases) ? aliases.react : undefined;
    const reactModules = typeof reactAlias === 'string' ? dirname(reactAlias) : undefined;
    const directory = mkdtempSync(join(tmpdir(), 'fluent-cypress-id-namespace-'));
    try {
      const version = prepareDemo(directory, reactModules);
      await prepareConsumers(directory, reactModules);
      config.env.idNamespaceReactVersion = version;
      webpackConfig.devServer = {
        ...webpackConfig.devServer,
        static: { directory, publicPath: '/id-namespace-demo' },
      };
      on('after:run', () => rmSync(directory, { recursive: true, force: true }));
      return config;
    } catch (error) {
      rmSync(directory, { recursive: true, force: true });
      throw error;
    }
  },
};

export default { ...baseConfig, component };
