import { webpack, WebpackFinalConfig, WebpackFinalOptions } from '../webpack';

export function webpackFinal(config: WebpackFinalConfig, options: WebpackFinalOptions) {
  return webpack(config, options);
}
