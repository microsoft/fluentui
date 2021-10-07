import type { TransformOptions } from '@babel/core';
import type { EvalRule } from '@linaria/babel-preset';

export type BabelPluginOptions = {
  /** Defines set of modules and imports handled by a plugin. */
  modules?: { moduleSource: string; importName: string }[];

  /**
   * If you need to specify custom Babel configuration, you can pass them here. These options will be used by the
   * plugin when parsing and evaluating modules.
   */
  babelOptions?: Pick<TransformOptions, 'plugins' | 'presets'>;

  /** The set of rules that defines how the matched files will be transformed during the evaluation. */
  evaluationRules?: EvalRule[];
};
