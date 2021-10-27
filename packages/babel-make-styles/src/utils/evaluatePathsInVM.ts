import { NodePath, types as t } from '@babel/core';
import { Scope } from '@babel/traverse';
import * as template from '@babel/template';
import generator from '@babel/generator';
import { resolveProxyValues } from '@fluentui/make-styles';
import { Module, StrictOptions } from '@linaria/babel-preset';

import type { BabelPluginOptions } from '../types';
import { astify } from './astify';

const EVAL_EXPORT_NAME = '__mkPreval';

function evaluate(code: string, filename: string, pluginOptions: Required<BabelPluginOptions>) {
  const options: StrictOptions = {
    displayName: false,
    evaluate: true,

    rules: pluginOptions.evaluationRules,
    babelOptions: {
      ...pluginOptions.babelOptions,

      // This instance of Babel should ignore all user's configs and apply only our plugin
      configFile: false,
      babelrc: false,
    },
  };
  const mod = new Module(filename, options);

  mod.evaluate(code, [EVAL_EXPORT_NAME]);

  return mod.exports[EVAL_EXPORT_NAME];
}

function findFreeName(scope: Scope, name: string): string {
  // By default `name` is used as a name of the function …
  let nextName = name;
  let idx = 0;
  while (scope.hasBinding(nextName, false)) {
    // … but if there is an already defined variable with this name …
    // … we are trying to use a name like wrap_N
    idx += 1;
    nextName = `wrap_${idx}`;
  }

  return nextName;
}

const expressionWrapperTpl = template.statement(`
  const %%wrapName%% = (fn) => {
    try {
      return fn();
    } catch (e) {
      return e;
    }
  };
`);

/**
 * Functions, call & member expressions should be wrapped with IIFE to ensure that "theme" object will be passed
 * without collisions.
 *
 * @example
 * {
 *   label: foo(), // call expression
 *   header: typography.header, // could be an object or a function
 * }
 *
 * Outputs following template:
 * @example
 * wrap(() => typeof foo === 'function' ? foo(theme) : foo)
 */
export const expressionTpl = template.expression(
  `%%wrapName%%(() => typeof %%expression%% === 'function' ? %%expression%%(%%themeVariableName%%) : %%expression%%)`,
);
const exportsPrevalTpl = template.statement(`exports.${EVAL_EXPORT_NAME} = %%expressions%%`);

/**
 * Creates a new program that includes required imports and wrappers to return resolved values.
 */
function addPreval(
  path: NodePath<t.Program>,
  themeVariableName: string,
  lazyDeps: Array<t.Expression | t.SpreadElement>,
): t.Program {
  // Constant __mkPreval with all dependencies
  const wrapName = findFreeName(path.scope, '_wrap');
  const proxyImportName = path.scope.generateUid('createCSSVariablesProxy');

  const programNode = path.node;

  return t.program(
    // Temporary solution to solve "theme" dependency
    [
      t.importDeclaration(
        [t.importSpecifier(t.identifier(proxyImportName), t.identifier('createCSSVariablesProxy'))],
        t.stringLiteral('@fluentui/make-styles'),
      ),

      t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier(themeVariableName), t.callExpression(t.identifier(proxyImportName), [])),
      ]),

      ...programNode.body,

      expressionWrapperTpl({ wrapName }),
      exportsPrevalTpl({
        expressions: t.arrayExpression(
          lazyDeps.map(expression => expressionTpl({ expression, wrapName, themeVariableName })),
        ),
      }),
    ],
    programNode.directives,
    programNode.sourceType,
    programNode.interpreter,
  );
}

/**
 * Evaluates passed paths in Node environment to resolve all lazy values.
 */
export function evaluatePathsInVM(
  program: NodePath<t.Program>,
  filename: string,
  nodePaths: NodePath<t.Expression | t.SpreadElement>[],
  pluginOptions: Required<BabelPluginOptions>,
): void {
  const themeVariableName = program.scope.generateUid('theme');

  const pathsToEvaluate = nodePaths.map(nodePath => {
    // spreads ("...fooBar") can't be executed directly, so they are wrapped with an object ("{...fooBar}")
    if (nodePath.isSpreadElement()) {
      return t.objectExpression([nodePath.node as t.SpreadElement]);
    }

    return nodePath.node;
  });

  // Linaria also performs hoisting of identifiers, we don't need this as all makeStyles() calls should be top level
  const modifiedProgram = addPreval(program, themeVariableName, pathsToEvaluate);

  const { code } = generator(modifiedProgram);
  const results = evaluate(code, filename, pluginOptions);

  for (let i = 0; i < nodePaths.length; i++) {
    const nodePath = nodePaths[i];

    // 👇 we should resolve proxy values (they are defined as functions) before creating AST from an object with styles
    const result = resolveProxyValues(results[i]);

    // 💡 spreads can't replace itself, we should replace it with with properties
    if (nodePath.isSpreadElement()) {
      nodePath.replaceWithMultiple((astify(result) as t.ObjectExpression).properties);
      continue;
    }

    nodePath.replaceWith(astify(result));
  }
}
