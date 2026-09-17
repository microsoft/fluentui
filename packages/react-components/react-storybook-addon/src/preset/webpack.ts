import * as path from 'path';

import { DefinePlugin } from 'webpack';

import { getStateDataAttributesConfig } from './options';

type WebpackFinalFn = NonNullable<import('@storybook/react-webpack5').StorybookConfig['webpackFinal']>;
export type WebpackFinalConfig = Parameters<WebpackFinalFn>[0];
export type WebpackFinalOptions = Parameters<WebpackFinalFn>[1];

/**
 * Generates state data-attribute metadata when configured and injects it through webpack's DefinePlugin.
 */
export function webpack(config: WebpackFinalConfig, options: WebpackFinalOptions): WebpackFinalConfig {
  const stateDataAttributesConfig = getStateDataAttributesConfig(options);

  if (!stateDataAttributesConfig) {
    return config;
  }

  if (!path.isAbsolute(stateDataAttributesConfig.packageRoot)) {
    throw new Error('stateDataAttributes.packageRoot must be an absolute path');
  }

  const { getStateDataAttributes } = require('./getStateDataAttributes') as typeof import('./getStateDataAttributes');

  config.plugins ??= [];
  config.plugins.push(
    new DefinePlugin({
      FLUENT_STATE_DATA_ATTRIBUTE_ARG_TYPES: JSON.stringify(getStateDataAttributes(stateDataAttributesConfig)),
    }),
  );

  return config;
}
