import { NodePath, transformSync, types as t } from '@babel/core';
import { Scope } from '@babel/traverse';
import * as template from '@babel/template';
import generator from '@babel/generator';
import { resolveProxyValues } from '@fluentui/make-styles';
import { Evaluator, Module, StrictOptions } from '@linaria/babel';

import { astify } from './astify';

const EVAL_EXPORT_NAME = '__mkPreval';

const evaluator: Evaluator = (filename, options, text) => {
  const { code } = transformSync(text, {
    // to avoid collisions with user's configs
    babelrc: false,

    filename: filename,
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  })!;

  return [code!, null];
};

function evaluate(code: string, f: string) {
  const options: StrictOptions = {
    displayName: false,
    evaluate: true,

    rules: [
      {
        // TODO: this should use @linaria/shaker for better performance and less dependencies
        action: evaluator,
      },
      {
        test: /\/node_modules\//,
        action: 'ignore',
      },
    ],
    babelOptions: {},
  };
  const mod = new Module(f, options);

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

/**
 * Hoist the node and its dependencies to the highest scope possible
 *
 * @internal
 */
// function hoist(ex: NodePath<t.Expression | null>) {
//   const Identifier = (idPath: NodePath<t.Identifier>) => {
//     if (!idPath.isReferencedIdentifier()) {
//       return;
//     }
//
//     const binding = idPath.scope.getBinding(idPath.node.name);
//
//     if (!binding) {
//       return;
//     }
//
//     const { scope, path: bindingPath, referencePaths } = binding;
//     // parent here can be null or undefined in different versions of babel
//     if (!scope.parent) {
//       // It's a variable from global scope
//       return;
//     }
//
//     if (bindingPath.isVariableDeclarator()) {
//       const initPath = bindingPath.get('init') as NodePath<t.Expression | null>;
//
//       hoist(initPath);
//       initPath.hoist(scope);
//
//       if (initPath.isIdentifier()) {
//         referencePaths.forEach(referencePath => {
//           referencePath.replaceWith(t.identifier(initPath.node.name));
//         });
//       }
//     }
//   };
//
//   if (ex.isIdentifier()) {
//     return Identifier(ex);
//   }
//
//   ex.traverse({
//     Identifier,
//   });
// }

const expressionWrapperTpl = template.statement(`
  const %%wrapName%% = (fn) => {
    try {
      return fn();
    } catch (e) {
      return e;
    }
  };
`);

const expressionTpl = template.expression(`%%wrapName%%(() => %%expression%%)`);
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
        expressions: t.arrayExpression(lazyDeps.map(expression => expressionTpl({ expression, wrapName }))),
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
): void {
  const themeVariableName = program.scope.generateUid('theme');

  const hoistedPathsToEvaluate = nodePaths.map(nodePath => {
    // save original expression that may be changed during hoisting
    const originalNode = t.cloneNode(nodePath.node);

    // TODO: re-enable it as it's required for shaker
    // Broken fixture is "compiled-optional-chaining"
    // hoist(nodePath as NodePath<t.Expression | null>);

    // save hoisted expression to be used to evaluation
    const hoistedNode = t.cloneNode(nodePath.node);

    // get back original expression to the tree
    nodePath.replaceWith(originalNode);

    // spreads ("...fooBar") can't be executed directly, so they are wrapped with an object ("{...fooBar}")
    if (nodePath.isSpreadElement()) {
      return t.objectExpression([hoistedNode as t.SpreadElement]);
    }

    // functions should be wrapped with IIFE to ensure that "theme" object will be passed without collisions
    if (nodePath.isArrowFunctionExpression() || nodePath.isFunctionExpression()) {
      return t.callExpression(hoistedNode as t.ArrowFunctionExpression, [t.identifier(themeVariableName)]);
    }

    // call expressions should be wrapped with IIFE to ensure that "theme" object will be passed without collisions
    // TODO: right now this only for call expression that returns a function that takes "theme" object as argument
    if (nodePath.isCallExpression()) {
      return t.callExpression(hoistedNode as t.CallExpression, [t.identifier(themeVariableName)]);
    }

    return hoistedNode;
  });

  const modifiedProgram = addPreval(program, themeVariableName, hoistedPathsToEvaluate);

  const { code } = generator(modifiedProgram);
  const results = evaluate(code, filename);

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
