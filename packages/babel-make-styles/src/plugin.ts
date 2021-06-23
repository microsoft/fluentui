import { NodePath, PluginObj, PluginPass, types as t } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import { Module } from '@linaria/babel';
import { MakeStyles, ResolvedStylesBySlots, resolveStyleRules } from '@fluentui/make-styles';

import { UNHANDLED_CASE_ERROR } from './constants';
import { astify } from './utils/astify';
import { evaluatePaths } from './utils/evaluatePaths';

type AstStyleNode =
  | { kind: 'PURE_OBJECT'; nodePath: NodePath<t.ObjectExpression> }
  | {
      kind: 'LAZY_OBJECT';
      nodePath: NodePath<t.ObjectExpression>;
      lazyPaths: NodePath<t.Expression | t.SpreadElement>[];
    }
  | { kind: 'LAZY_FUNCTION'; nodePath: NodePath<t.ArrowFunctionExpression | t.FunctionExpression> }
  | { kind: 'LAZY_EXPRESSION_CALL'; nodePath: NodePath<t.CallExpression> }
  | { kind: 'LAZY_IDENTIFIER'; nodePath: NodePath<t.Identifier> }
  | { kind: 'SPREAD'; nodePath: NodePath<t.SpreadElement>; spreadPath: NodePath<t.SpreadElement> };

type BabelPluginOptions = {
  modules: { moduleSource: string; importName: string }[];
};
type BabelPluginState = PluginPass & {
  importDeclarationPath?: NodePath<t.ImportDeclaration>;
  requireDeclarationPath?: NodePath<t.VariableDeclarator>;

  /** Contains all paths to calls of makeStyles(). */
  calleePaths?: NodePath<t.Identifier>[];

  /** Contains AST nodes with that should be resolved. */
  styleNodes?: AstStyleNode[];
};

/**
 * Parses a MemberExpression that defines token usage for extract parts that are needed to generate a CSS variable.
 *
 * @example
 *   getTokenParts(theme.alias.color.green.foreground1)
 *   // results in
 *   ['alias', 'color', 'green', 'foreground']
 */
function getTokenParts(path: NodePath<t.MemberExpression>, result: string[] = []): string[] {
  const objectPath = path.get('object');
  const propertyPath = path.get('property');

  if (objectPath.isMemberExpression()) {
    getTokenParts(objectPath, result);
  } else if (objectPath.isIdentifier()) {
    // We ignore this part as it will return a first id (i.e. "theme")
  } else {
    throw objectPath.buildCodeFrameError(UNHANDLED_CASE_ERROR);
  }

  if (propertyPath.isIdentifier()) {
    result.push(propertyPath.node.name);
  }

  return result;
}

/**
 * Gets an Identifier from a MemberExpression that represents theme variable name.
 */
function getMemberExpressionIdentifier(expressionPath: NodePath<t.MemberExpression>): NodePath<t.Identifier> {
  const objectPath = expressionPath.get('object');

  if (objectPath.isIdentifier()) {
    return objectPath;
  }

  if (objectPath.isMemberExpression()) {
    return getMemberExpressionIdentifier(objectPath);
  }

  throw objectPath.buildCodeFrameError(UNHANDLED_CASE_ERROR);
}

/**
 * Checks that passed callee imports makesStyles().
 */
function isMakeStylesCallee(
  path: NodePath<t.Expression | t.V8IntrinsicIdentifier>,
  modules: BabelPluginOptions['modules'],
): path is NodePath<t.Identifier> {
  if (path.isIdentifier()) {
    return Boolean(modules.find(module => path.referencesImport(module.moduleSource, module.importName)));
  }

  return false;
}

/**
 * Checks if import statement import makeStyles().
 */
function hasMakeStylesImport(path: NodePath<t.ImportDeclaration>, modules: BabelPluginOptions['modules']): boolean {
  return Boolean(modules.find(module => path.node.source.value === module.moduleSource));
}

/**
 * Checks that passed declarator imports makesStyles().
 *
 * @example react_make_styles_1 = require('@fluentui/react-make-styles')
 */
function isRequireDeclarator(path: NodePath<t.VariableDeclarator>): boolean {
  const initPath = path.get('init');

  if (!initPath.isCallExpression()) {
    return false;
  }

  if (initPath.get('callee').isIdentifier({ name: 'require' })) {
    const args = initPath.get('arguments');

    return (
      Array.isArray(args) && args.length === 1 && args[0].isStringLiteral({ value: '@fluentui/react-make-styles' })
    );
  }

  return false;
}

function namesToCssVariable(names: string[]): string {
  return `var(--${names.join('-')})`;
}

/**
 * Processes an object (makeStyles argument) and collects smallest possible paths for evaluation later.
 */
function processDefinitions(
  argumentsPaths: NodePath<t.CallExpression['arguments'][number]>[],
  state: BabelPluginState,
): void {
  const hasValidArguments = Array.isArray(argumentsPaths) && argumentsPaths.length === 1;

  if (!hasValidArguments) {
    throw new Error('makeStyles() function accepts only a single param');
  }

  const definitionsPath = argumentsPaths[0];

  if (!definitionsPath.isObjectExpression()) {
    throw definitionsPath.buildCodeFrameError('makeStyles() function accepts only an object as a param');
  }

  const styleSlots = definitionsPath.get('properties');

  styleSlots.forEach(styleSlotPath => {
    if (styleSlotPath.isObjectMethod()) {
      throw styleSlotPath.buildCodeFrameError('Object methods are not supported for defining styles');
    }

    /**
     * Needs lazy evaluation anyway.
     *
     * @example makeStyles({ ...SOME_STYLES })
     */
    if (styleSlotPath.isSpreadElement()) {
      // Heads up!
      //
      // Babel can't evaluate spreads so we will fallback into VM execution anyway. Evaluation in VM replaces evaluated
      // paths, this means that we will loose a "nodePath" as an identifier and will not be able to replace this path
      // later.
      // There we are cloning an existing spread and creating a wrapping spread:
      // "{ ...fooBar }" becomes "{ ...{ ...forBar } }"
      //                                 ^ this spread will be evaluated in VM
      //                            ^ this spread will be used for replacement later
      const spreadArgumentPath = styleSlotPath.get('argument');
      const clonedArgumentNode = t.cloneNode(spreadArgumentPath.node);
      const wrappingSpreadArgumentNode = t.objectExpression([t.spreadElement(clonedArgumentNode)]);

      spreadArgumentPath.replaceWith(wrappingSpreadArgumentNode);
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
            throw propertyPath.buildCodeFrameError('Object methods are not supported for defining styles');
          }

          if (propertyPath.isObjectProperty()) {
            const valuePath = propertyPath.get('value');

            if (valuePath.isStringLiteral() || valuePath.isNullLiteral() || valuePath.isNumericLiteral()) {
              return;
            }

            // TODO: properly support this case to avoid useless lazy evaluations (as they should be slower)
            //       We should use recursive lookup there
            //
            // if (valuePath.isObjectExpression()) {
            //   return;
            // }

            if (valuePath.isExpression()) {
              lazyPaths.push(valuePath);
              return;
            }

            throw valuePath.buildCodeFrameError(UNHANDLED_CASE_ERROR);
          }

          if (propertyPath.isSpreadElement()) {
            lazyPaths.push(propertyPath);
            return;
          }

          throw propertyPath.buildCodeFrameError(UNHANDLED_CASE_ERROR);
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
          throw stylesPath.buildCodeFrameError('A function in makeStyles() can only a single param');
        }

        const paramsPath = stylesPath.get('params.0') as NodePath<t.Node>;

        if (!paramsPath.isIdentifier()) {
          throw stylesPath.buildCodeFrameError(
            'A function in makeStyles() can only a single param and it should be a valid identifier',
          );
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
              throw propertyPath.buildCodeFrameError('Object methods are not supported for defining styles');
            }

            if (propertyPath.isObjectProperty()) {
              const valuePath = propertyPath.get('value');

              if (valuePath.isStringLiteral() || valuePath.isNullLiteral() || valuePath.isNumericLiteral()) {
                return;
              }

              // This condition resolves "theme.alias.color.green.foreground1" to CSS variable
              if (valuePath.isMemberExpression()) {
                const identifierPath = getMemberExpressionIdentifier(valuePath);

                if (identifierPath.isIdentifier({ name: paramsName })) {
                  const cssVariable = namesToCssVariable(getTokenParts(valuePath));

                  valuePath.replaceWith(t.stringLiteral(cssVariable));
                }

                return;
              }

              if (valuePath.isExpression()) {
                lazyPaths.push(valuePath);
                return;
              }

              throw valuePath.buildCodeFrameError(UNHANDLED_CASE_ERROR);
            }

            if (propertyPath.isSpreadElement()) {
              lazyPaths.push(propertyPath);
              return;
            }

            throw propertyPath.buildCodeFrameError(UNHANDLED_CASE_ERROR);
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

      if (stylesPath.isCallExpression()) {
        state.styleNodes?.push({
          kind: 'LAZY_EXPRESSION_CALL',
          nodePath: stylesPath,
        });
        return;
      }
    }

    throw styleSlotPath.buildCodeFrameError(UNHANDLED_CASE_ERROR);
  });
}

export const plugin = declare<Partial<BabelPluginOptions>, PluginObj<BabelPluginState>>((api, options) => {
  api.assertVersion(7);

  const pluginOptions: BabelPluginOptions = {
    modules: [
      { moduleSource: '@fluentui/react-components', importName: 'makeStyles' },
      { moduleSource: '@fluentui/react-make-styles', importName: 'makeStyles' },
    ],

    ...options,
  };

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
          if (!state.importDeclarationPath && !state.requireDeclarationPath) {
            return;
          }

          const pathsToEvaluate = state.styleNodes!.reduce<NodePath<t.Expression | t.SpreadElement>[]>(
            (acc, styleNode) => {
              if (
                styleNode.kind === 'LAZY_IDENTIFIER' ||
                styleNode.kind === 'LAZY_FUNCTION' ||
                styleNode.kind === 'LAZY_EXPRESSION_CALL'
              ) {
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

              throw new Error(
                `We don't support "styleNode.kind=${
                  (styleNode as AstStyleNode).kind
                }", this is a bug, please report it`,
              );
            },
            [],
          );

          if (pathsToEvaluate.length > 0) {
            evaluatePaths(path, state.file.opts.filename!, pathsToEvaluate);
          }

          state.styleNodes?.forEach(styleNode => {
            const nodePath = styleNode.nodePath;

            if (styleNode.kind === 'SPREAD') {
              const evaluationResult = (nodePath.get('argument') as NodePath<t.Expression>).evaluate();

              if (!evaluationResult.confident) {
                throw nodePath.buildCodeFrameError(
                  'Evaluation of a code fragment failed, this is a bug, please report it',
                );
              }

              const stylesBySlots: Record<string, MakeStyles> = evaluationResult.value;
              const resolvedStyles: ResolvedStylesBySlots<string> = {};

              Object.keys(stylesBySlots).forEach(slotName => {
                resolvedStyles[slotName] = resolveStyleRules(stylesBySlots[slotName]);
              });

              nodePath.replaceWithMultiple((astify(resolvedStyles) as t.ObjectExpression).properties);

              return;
            }

            const evaluationResult = nodePath.evaluate();

            if (!evaluationResult.confident) {
              throw nodePath.buildCodeFrameError(
                'Evaluation of a code fragment failed, this is a bug, please report it',
              );
            }

            const styles: MakeStyles = evaluationResult.value;
            const resolvedStyles = resolveStyleRules(styles);

            nodePath.replaceWith(astify(resolvedStyles));
          });

          if (state.importDeclarationPath) {
            const specifiers = state.importDeclarationPath.get('specifiers');
            const source = state.importDeclarationPath.get('source');

            specifiers.forEach(specifier => {
              if (specifier.isImportSpecifier()) {
                // TODO: should use generated modifier to avoid collisions

                const importedPath = specifier.get('imported');
                const importIdentifierPath = pluginOptions.modules.find(module => {
                  return (
                    module.moduleSource === source.node.value &&
                    // 👆 "moduleSource" should match "importDeclarationPath.source" to skip unrelated ".importName"
                    importedPath.isIdentifier({ name: module.importName })
                  );
                });

                if (importIdentifierPath) {
                  specifier.replaceWith(t.identifier('__styles'));
                }
              }
            });
          }

          if (state.calleePaths!.length > 0) {
            state.calleePaths!.forEach(calleePath => {
              calleePath.replaceWith(t.identifier('__styles'));
            });
          }
        },
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration(path, state) {
        if (hasMakeStylesImport(path, pluginOptions.modules)) {
          state.importDeclarationPath = path;
        }
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      VariableDeclarator(path, state) {
        if (isRequireDeclarator(path)) {
          state.requireDeclarationPath = path;
          return;
        }
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(path, state) {
        if (!state.importDeclarationPath) {
          return;
        }

        const calleePath = path.get('callee');

        if (!isMakeStylesCallee(calleePath, pluginOptions.modules)) {
          return;
        }

        processDefinitions(path.get('arguments'), state);
        state.calleePaths!.push(calleePath);
      },

      // eslint-disable-next-line @typescript-eslint/naming-convention
      MemberExpression(expressionPath, state) {
        if (!state.requireDeclarationPath) {
          return;
        }

        const objectPath = expressionPath.get('object');
        const propertyPath = expressionPath.get('property');

        const isMakeStylesCall =
          objectPath.isIdentifier({ name: (state.requireDeclarationPath.node.id as t.Identifier).name }) &&
          propertyPath.isIdentifier({ name: 'makeStyles' });

        if (!isMakeStylesCall) {
          return;
        }

        const parentPath = expressionPath.parentPath;

        if (!parentPath.isCallExpression()) {
          return;
        }

        processDefinitions(parentPath.get('arguments'), state);
        state.calleePaths!.push(propertyPath as NodePath<t.Identifier>);
      },
    },
  };
});
