import { NodePath, PluginObj, PluginPass, types as t } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import { Module } from '@linaria/babel';

import { evaluatePaths } from './utils/evaluatePaths';
import { MakeStyles, ResolvedStylesBySlots, resolveStyleRules } from '@fluentui/make-styles';
import { astify } from './utils/astify';
import generator from '@babel/generator';

function getMemberExpressionIdentifier(expressionPath: NodePath<t.MemberExpression>): NodePath<t.Identifier> {
  const objectPath = expressionPath.get('object');

  if (objectPath.isIdentifier()) {
    return objectPath;
  }

  if (objectPath.isMemberExpression()) {
    return getMemberExpressionIdentifier(objectPath);
  }

  throw new Error('!!!');
}

function isMakeStylesCallExpression(
  expressionPath: NodePath<t.Expression | t.V8IntrinsicIdentifier>,
): expressionPath is NodePath<t.Identifier> {
  if (expressionPath.isIdentifier()) {
    return expressionPath.referencesImport('@fluentui/react-make-styles', 'makeStyles');
  }

  return false;
}

function getMemberExpressionNames(expressionPath: NodePath<t.MemberExpression>, result: string[] = []): string[] {
  const objectPath = expressionPath.get('object');
  const propertyPath = expressionPath.get('property');

  if (objectPath.isIdentifier()) {
    // NOT THERE
  } else if (objectPath.isMemberExpression()) {
    getMemberExpressionNames(objectPath, result);
  } else {
    throw new Error('!!!');
  }

  if (propertyPath.isIdentifier()) {
    result.push(propertyPath.node.name);
  }

  return result;
}

function namesToCssVariable(names: string[]): string {
  let variable = '';

  for (let i = 0; i < names.length; i++) {
    if (i === 0) {
      variable += `var(--${names[i]}`;
    } else {
      variable += `-${names[i]}`;
    }
  }

  return `${variable})`;
}

type AstStyleNode =
  | { kind: 'PURE_OBJECT'; nodePath: NodePath<t.ObjectExpression> }
  | {
      kind: 'LAZY_OBJECT';
      nodePath: NodePath<t.ObjectExpression>;
      lazyPaths: NodePath<t.Expression | t.SpreadElement>[];
    }
  | { kind: 'LAZY_FUNCTION'; nodePath: NodePath<t.ArrowFunctionExpression | t.FunctionExpression> }
  | { kind: 'LAZY_IDENTIFIER'; nodePath: NodePath<t.Identifier> }
  | { kind: 'SPREAD'; nodePath: NodePath<t.SpreadElement>; spreadPath: NodePath<t.SpreadElement> };

type BabelPluginState = PluginPass & {
  importDeclarationPath?: NodePath<t.ImportDeclaration>;

  /** Contains all paths to calls of makeStyles(). */
  calleePaths?: NodePath<t.Identifier>[];

  /** Contains AST nodes with that should be resolved. */
  styleNodes?: AstStyleNode[];
};

export const plugin = declare<never, PluginObj<BabelPluginState>>(api => {
  api.assertVersion(7);

  return {
    name: '@fluentui/babel-make-styles',

    pre() {
      this.calleePaths = [];
      this.styleNodes = [];
    },

    visitor: {
      Program: {
        enter() {
          // Invalidate cache for module evaluation to get fresh modules
          Module.invalidate();
        },

        exit(path, state) {
          if (!state.importDeclarationPath) {
            return;
          }

          const pathsToEvaluate = state.styleNodes!.reduce<NodePath<t.Expression | t.SpreadElement>[]>(
            (acc, styleNode) => {
              if (styleNode.kind === 'LAZY_IDENTIFIER' || styleNode.kind === 'LAZY_FUNCTION') {
                return [...acc, styleNode.nodePath];
              }

              if (styleNode.kind === 'LAZY_OBJECT') {
                return [...acc, ...styleNode.lazyPaths];
              }

              if (styleNode.kind === 'PURE_OBJECT') {
                return acc;
              }

              if (styleNode.kind === 'SPREAD') {
                return [...acc, styleNode.spreadPath];
              }

              throw new Error(/* TODO */);
            },
            [],
          );

          if (pathsToEvaluate.length > 0) {
            evaluatePaths(path, state.file.opts.filename!, pathsToEvaluate);
          }

          state.styleNodes?.forEach(styleNode => {
            const nodePath = styleNode.nodePath;

            if (styleNode.kind === 'SPREAD') {
              // eslint-disable-next-line no-shadow
              const evaluationResult = (nodePath.get('argument') as NodePath<t.Expression>).evaluate();

              if (!evaluationResult.confident) {
                console.log('styleNode.kind', styleNode.kind);
                console.log('code', generator(path.node).code);
                // console.log('r', evaluationResult);
                console.log('node', nodePath.node);
                throw new Error(/* TODO */);
              }

              const stylesBySlots: Record<string, MakeStyles> = evaluationResult.value;
              // eslint-disable-next-line no-shadow
              const resolvedStyles: ResolvedStylesBySlots<string> = {};

              Object.keys(stylesBySlots).forEach(slotName => {
                resolvedStyles[slotName] = resolveStyleRules(stylesBySlots[slotName]);
              });

              nodePath.replaceWithMultiple((astify(resolvedStyles) as t.ObjectExpression).properties);

              return;
            }

            const evaluationResult = nodePath.evaluate();

            if (!evaluationResult.confident) {
              console.log('styleNode.kind', styleNode.kind);
              console.log('code', generator(path.node).code);
              // console.log('r', evaluationResult);
              console.log('node', nodePath.node);
              throw new Error(/* TODO */);
            }

            const styles: MakeStyles = evaluationResult.value;
            const resolvedStyles = resolveStyleRules(styles);

            nodePath.replaceWith(astify(resolvedStyles));
          });

          const specifiers = state.importDeclarationPath.get('specifiers');

          specifiers.forEach(specifier => {
            if (specifier.isImportSpecifier()) {
              const imported = specifier.get('imported');

              if (imported.isIdentifier({ name: 'makeStyles' })) {
                // TODO: should use generated modifier to avoid collisions
                specifier.replaceWith(t.identifier('prebuildStyles'));
              }
            }
          });

          if (state.calleePaths!.length > 0) {
            state.calleePaths!.forEach(calleePath => {
              calleePath.replaceWith(t.identifier('prebuildStyles'));
            });
          }
        },
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration(path, state) {
        if (path.node.source.value !== '@fluentui/react-make-styles') {
          return;
        }

        state.importDeclarationPath = path;
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(expressionPath, state) {
        if (!state.importDeclarationPath) {
          return;
        }

        const calleePath = expressionPath.get('callee');

        if (!isMakeStylesCallExpression(calleePath)) {
          return;
        }

        const args = expressionPath.get('arguments');
        const hasValidArgument = Array.isArray(args) && args.length === 1;

        if (!hasValidArgument) {
          throw new Error();
        }

        state.calleePaths!.push(calleePath);

        const definitionsPath = expressionPath.get('arguments.0') as NodePath<t.Node>;

        if (!definitionsPath.isObjectExpression()) {
          throw new Error(/* TODO */);
        }

        const styleSlots = definitionsPath.get('properties');

        styleSlots.forEach(styleSlotPath => {
          /**
           * Needs lazy evaluation anyway.
           *
           * @example makeStyles({ ...SOME_STYLES })
           */
          if (styleSlotPath.isSpreadElement()) {
            // TODO: Document this plz
            const spreadArgument = styleSlotPath.get('argument');
            const clone = t.cloneNode(spreadArgument.node);
            const wrappingSpreadArgument = t.objectExpression([t.spreadElement(clone)]);

            spreadArgument.replaceWith(wrappingSpreadArgument);

            state.styleNodes?.push({
              kind: 'SPREAD',
              nodePath: styleSlotPath,
              spreadPath: styleSlotPath.get('argument.properties.0') as NodePath<t.SpreadElement>,
            });
            return;
          }

          if (styleSlotPath.isObjectProperty()) {
            const stylesPath = styleSlotPath.get('value');

            /**
             * Needs lazy evaluation anyway.
             *
             * @example makeStyles({ root: SOME_VARIABLE })
             */
            if (stylesPath.isIdentifier()) {
              state.styleNodes?.push({
                kind: 'LAZY_IDENTIFIER',
                nodePath: stylesPath,
              });
              return;
            }

            /**
             * May need lazy evaluation in less optimistic scenarios.
             *
             * @example
             *    makeStyles({ root: { color: 'red' } }) // ✔ can be resolved in AST
             *    makeStyles({ root: { color: SOME_VARIABLE } }) // ❌ lazy evaluation
             *    makeStyles({ ...sharedStyles }) // ❌ lazy evaluation
             */
            if (stylesPath.isObjectExpression()) {
              const propertiesPaths = stylesPath.get('properties');
              const lazyPaths: NodePath<t.Expression | t.SpreadElement>[] = [];

              propertiesPaths.forEach(propertyPath => {
                if (propertyPath.isObjectMethod()) {
                  throw new Error(/* TODO */);
                }

                if (propertyPath.isObjectProperty()) {
                  const valuePath = propertyPath.get('value');

                  if (valuePath.isStringLiteral() || valuePath.isNullLiteral() || valuePath.isNumericLiteral()) {
                    return;
                  }

                  // TODO: properly support this case to avoid useless lazy evaluations (as they should be slower).
                  //       We should use recursive lookup there.
                  //
                  // if (valuePath.isObjectExpression()) {
                  //   return;
                  // }

                  if (valuePath.isExpression()) {
                    lazyPaths.push(valuePath);
                    return;
                  }

                  throw new Error(/* TODO */);
                }

                if (propertyPath.isSpreadElement()) {
                  lazyPaths.push(propertyPath);
                  return;
                }

                throw new Error(/* TODO */);
              });

              if (lazyPaths.length === 0) {
                state.styleNodes?.push({
                  kind: 'PURE_OBJECT',
                  nodePath: stylesPath,
                });
                return;
              }

              state.styleNodes?.push({
                kind: 'LAZY_OBJECT',
                nodePath: stylesPath,
                lazyPaths,
              });
              return;
            }

            /**
             * A scenario when slots styles are represented by functions, in the worst case fallbacks to lazy
             * evaluation.
             *
             * @example
             *    // ✔ can be resolved in AST
             *    makeStyles({ root: (t) => ({ color: t.red }) })
             *    // ❌ lazy evaluation
             *    makeStyles({ root: (t) => ({ color: SOME_VARIABLE }) })
             *    // ❌ lazy evaluation, the worst case as function contains body
             *    makeStyles({ root: (t) => { return { color: SOME_VARIABLE } } })
             */
            if (stylesPath.isArrowFunctionExpression()) {
              if (stylesPath.get('params').length > 1) {
                throw new Error(/* TODO */);
              }

              const paramsPath = stylesPath.get('params.0') as NodePath<t.Node>;

              if (!paramsPath.isIdentifier()) {
                throw new Error(/* TODO */);
              }

              const paramsName = paramsPath.node.name;
              const bodyPath = stylesPath.get('body');

              /**
               * Optimistic case, we may not need to use lazy evaluation 🚀
               *
               * @example
               *    // ✔ can be resolved in AST
               *    makeStyles({ root: (t) => ({ color: t.red }) })
               *    // ❌ lazy evaluation
               *    makeStyles({ root: (t) => ({ color: SOME_VARIABLE }) })
               */
              if (bodyPath.isObjectExpression()) {
                const propertiesPaths = bodyPath.get('properties');
                const lazyPaths: NodePath<t.Expression | t.SpreadElement>[] = [];

                propertiesPaths.forEach(propertyPath => {
                  if (propertyPath.isObjectMethod()) {
                    throw new Error(/* TODO */);
                  }

                  if (propertyPath.isObjectProperty()) {
                    const valuePath = propertyPath.get('value');

                    if (valuePath.isStringLiteral() || valuePath.isNullLiteral() || valuePath.isNumericLiteral()) {
                      return;
                    }

                    if (valuePath.isMemberExpression()) {
                      const identifierPath = getMemberExpressionIdentifier(valuePath);

                      if (identifierPath.isIdentifier({ name: paramsName })) {
                        const cssVariable = namesToCssVariable(getMemberExpressionNames(valuePath));

                        valuePath.replaceWith(t.stringLiteral(cssVariable));
                      }

                      return;
                    }

                    if (valuePath.isExpression()) {
                      lazyPaths.push(valuePath);
                      return;
                    }

                    throw new Error(/* TODO */);
                  }

                  if (propertyPath.isSpreadElement()) {
                    lazyPaths.push(propertyPath);
                    return;
                  }

                  throw new Error(/* TODO */);
                });

                if (lazyPaths.length === 0) {
                  stylesPath.replaceWith(bodyPath);
                  state.styleNodes?.push({
                    kind: 'PURE_OBJECT',
                    // 👇 as we replaced an arrow function with its body, we can cast typings
                    nodePath: (stylesPath as unknown) as NodePath<t.ObjectExpression>,
                  });
                  return;
                }

                state.styleNodes?.push({
                  kind: 'LAZY_FUNCTION',
                  nodePath: stylesPath,
                });
                return;

                // TODO: this can be lazy object once we will implement nested lookup, see object path for reference

                // stylesPath.replaceWith(bodyPath);
                // state.styleNodes?.push({
                //   kind: 'LAZY_OBJECT',
                //   // 👇 as we replaced an arrow function with its body, we can cast typings
                //   nodePath: (stylesPath as unknown) as NodePath<t.ObjectExpression>,
                //   lazyPaths,
                // });
                //
                // return;
              }

              state.styleNodes?.push({
                kind: 'LAZY_FUNCTION',
                nodePath: stylesPath,
              });
              return;
            }

            /**
             * A scenario when slots styles are represented by functions with body, fallbacks to lazy evaluation.
             *
             * @example
             *    // ❌ lazy evaluation
             *    makeStyles({ root: function (t) { return { color: SOME_VARIABLE } } })
             */
            if (stylesPath.isFunctionExpression()) {
              state.styleNodes?.push({
                kind: 'LAZY_FUNCTION',
                nodePath: stylesPath,
              });
              return;
            }
          }

          throw new Error(/* TODO */);
        });
      },
    },
  };
});
