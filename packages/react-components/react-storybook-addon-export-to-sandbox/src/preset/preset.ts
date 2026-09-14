import { webpack, WebpackFinalConfig, WebpackFinalOptions } from '../webpack';

export function webpackFinal(config: WebpackFinalConfig, options: WebpackFinalOptions): WebpackFinalConfig {
  return webpack(config, options);
}
