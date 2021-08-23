import type { TransformOptions } from '@babel/core';

export type BabelPluginOptions = {
  /** Defines set of modules and imports handled by a plugin. */
  modules?: { moduleSource: string; importName: string }[];

  /**
   * If you need to specify custom Babel configuration, you can pass them here. These options will be used by the
   * plugin when parsing and evaluating modules.
   */
  babelOptions?: Pick<TransformOptions, 'plugins' | 'presets'>;
};
