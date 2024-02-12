import { transformPlugin } from './transformPlugin';

import { type CallExpression, type ImportDeclaration } from '@babel/types';
import { type NodePath } from '@babel/traverse';
import { type PluginObj, type PluginPass } from '@babel/core';

// @public (undocumented)
type BabelPresetFunction = (
  api: object,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  options: Record<string, any> | null | undefined,
  dirname: string,
) => PluginObj<
  PluginPass & {
    importDeclarationPaths?: NodePath<ImportDeclaration>[] | undefined;
    nativeExpressionPaths?: NodePath<CallExpression>[] | undefined;
    contextSelectorExpressionPaths?: NodePath<CallExpression>[] | undefined;
    nativeLocalName?: string | undefined;
    contextSelectorLocalName?: string | undefined;
  }
>;
type BabelPreset = { plugins: BabelPresetFunction[][] };

export default function preset(): BabelPreset {
  return {
    plugins: [[transformPlugin]],
  };
}
