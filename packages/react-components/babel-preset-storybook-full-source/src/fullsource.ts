import * as Babel from '@babel/core';
import * as prettier from 'prettier';
import * as fs from 'fs';

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
 * And adds the following expression after it: Story.parameters.fullSource = `...`;
 *
 * This plugin is utilized by Export to CodeSandbox.
 *
 * @param babel - babel instance
 * @returns babel plugin
 */
export function fullSourcePlugin(babel: typeof Babel, options: BabelPluginOptions): Babel.PluginObj {
  const { types: t } = babel;

  let storyName: string;
  let parametersAssignment: Babel.NodePath<Babel.types.AssignmentExpression> | undefined;

  const createStoryParametersAssignmentExpression = () => {
    const storyParameters = t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
      t.objectExpression([]),
    );

    return t.expressionStatement(storyParameters);
  };

  const createFullSourceAssignmentExpression = (fullSource: string) => {
    return t.expressionStatement(
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
          t.identifier('fullSource'),
        ),
        t.stringLiteral(fullSource),
      ),
    );
  };

  return {
    name: PLUGIN_NAME,
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      VariableDeclarator(path) {
        if (
          t.isArrowFunctionExpression(path.node.init) &&
          t.isIdentifier(path.node.id) &&
          isComponentLikeName(path.node.id.name)
        ) {
          storyName = path.node.id.name;
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      AssignmentExpression(path) {
        if (
          t.isMemberExpression(path.node.left) &&
          t.isIdentifier(path.node.left.object) &&
          path.node.left.object.name === storyName &&
          t.isIdentifier(path.node.left.property) &&
          path.node.left.property.name === 'parameters'
        ) {
          parametersAssignment = path;
        }
      },
      Program: {
        enter() {
          storyName = '';
          parametersAssignment = undefined;
        },
        exit(path, state) {
          if (!storyName || !state.filename) {
            return;
          }

          const fileContents = fs.readFileSync(state.filename, 'utf-8');
          const transformedCode = babel.transformSync(fileContents, {
            ...state.file.opts,
            compact: false,
            retainLines: true,
            comments: false,
            plugins: [[modifyImportsPlugin, options], removeStorybookParameters],
          })?.code;

          const code = prettier.format(transformedCode ?? '', { parser: 'babel-ts' });

          if (!parametersAssignment) {
            path.pushContainer('body', createStoryParametersAssignmentExpression());
          }

          path.pushContainer('body', createFullSourceAssignmentExpression(code));
        },
      },
    },
  };
}

/**
 * Checks if the name is a component-like name.
 *
 * @param name - name to check
 * @returns true if the name is a component-like name (starts with a capital letter)
 */
function isComponentLikeName(name: string) {
  return name.charAt(0) === name.charAt(0).toUpperCase();
}
