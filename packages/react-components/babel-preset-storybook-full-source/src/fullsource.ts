import * as Babel from '@babel/core';
import * as prettier from 'prettier';

import { modifyImportsPlugin } from './modifyImports';
import { removeStorybookParameters } from './removeStorybookParameters';
import { BabelPluginOptions } from './types';

export const PLUGIN_NAME = 'storybook-stories-fullsource';

/**
 * This Babel plugin adds `context.parameters.fullSource` property to Storybook stories,
 * which contains source of the file where story is present.
 *
 * Specifically, it finds this expression in a story file: storyName.parameters = ...
 * And adds the following expression after it: storyName.parameters.fullSource = __STORY__;
 *
 * The __STORY__ variable is added to each story file by
 * [Storybook’s webpack loader](https://github.com/storybookjs/storybook/tree/next/lib/source-loader)
 * and contains source code of the story file.
 *
 * This plugin is utilized by Export to CodeSandbox.
 *
 * @param babel - babel instance
 * @returns babel plugin
 */
export function fullSourcePlugin(babel: typeof Babel, options: BabelPluginOptions): Babel.PluginObj {
  const { types: t } = babel;

  return {
    name: PLUGIN_NAME,
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      VariableDeclarator(path, state) {
        if (
          t.isIdentifier(path.node.id) &&
          t.isStringLiteral(path.node.init) &&
          path.node.id.name === '__STORY__' &&
          path.parentPath.isVariableDeclaration()
        ) {
          const transformedCode = babel.transformSync(path.node.init.value, {
            ...state.file.opts,
            compact: false,
            retainLines: true,
            comments: false,
            plugins: [[modifyImportsPlugin, options], removeStorybookParameters],
          })?.code;
          const code = prettier.format(transformedCode ?? '', { parser: 'babel-ts' });

          path.get('init').replaceWith(t.stringLiteral(code));
        }
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      MemberExpression(path) {
        if (
          t.isIdentifier(path.node.property) &&
          t.isIdentifier(path.node.object) &&
          path.node.property.name === 'parameters' &&
          path.parentPath.isAssignmentExpression()
        ) {
          const storyName = path.node.object.name;
          const expression = t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(
                t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
                t.identifier('fullSource'),
              ),
              t.identifier('__STORY__'),
            ),
          );
          const expressionStatement = path.findParent(p => p.isExpressionStatement());
          expressionStatement?.insertAfter(expression);
          path.stop();
        }
      },
    },
  };
}
