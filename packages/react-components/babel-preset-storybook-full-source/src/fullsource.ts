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
 * Specifically, it finds this expression in a story file: Story.parameters = ...
 * In case Story.parameters doesn't exist, it creates it.
 * And adds the following expression after it: Story.parameters.fullSource = __STORY__;
 *
 * The __STORY__ variable is added to each story file by
 * [Storybook’s webpack loader](https://github.com/storybookjs/storybook/tree/next/code/lib/source-loader)
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
      Program(programPath, state) {
        programPath.traverse({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          VariableDeclarator(path) {
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

              path.stop();
            }
          },
        });

        programPath.traverse({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          VariableDeclarator(path) {
            if (t.isArrowFunctionExpression(path.node.init) && t.isIdentifier(path.node.id)) {
              const storyName = path.node.id.name;

              let parametersAssignment: Babel.NodePath<Babel.types.AssignmentExpression> | undefined;

              // Find `Story.parameters` assignment
              programPath.traverse({
                // eslint-disable-next-line @typescript-eslint/naming-convention
                AssignmentExpression(assignmentPath) {
                  if (
                    t.isMemberExpression(assignmentPath.node.left) &&
                    t.isIdentifier(assignmentPath.node.left.object) &&
                    assignmentPath.node.left.object.name === storyName &&
                    t.isIdentifier(assignmentPath.node.left.property) &&
                    assignmentPath.node.left.property.name === 'parameters'
                  ) {
                    parametersAssignment = assignmentPath;
                  }
                },
              });

              if (parametersAssignment) {
                // If `Story.parameters` exists, add `StoryParameters.fullSource` property
                parametersAssignment.insertAfter(
                  t.expressionStatement(
                    t.assignmentExpression(
                      '=',
                      t.memberExpression(
                        t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
                        t.identifier('fullSource'),
                      ),
                      t.identifier('__STORY__'),
                    ),
                  ),
                );
              } else {
                // If `Story.parameters` doesn't exist, create it and add `StoryParameters.fullSource` property
                path.parentPath.insertAfter([
                  t.expressionStatement(
                    t.assignmentExpression(
                      '=',
                      t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
                      t.objectExpression([]),
                    ),
                  ),
                  t.expressionStatement(
                    t.assignmentExpression(
                      '=',
                      t.memberExpression(
                        t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
                        t.identifier('fullSource'),
                      ),
                      t.identifier('__STORY__'),
                    ),
                  ),
                ]);
              }
            }
          },
        });
      },
    },
  };
}
