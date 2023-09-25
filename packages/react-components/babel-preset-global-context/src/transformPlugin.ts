import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import { types } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import hash from '@emotion/hash';
import * as findUp from 'find-up';
import { dirname, relative } from 'path';
import { readFileSync } from 'fs';
import {
  CONTEXT_SELECTOR_PACKAGE,
  CREATE_CONTEXT_CALL,
  GLOBAL_CONTEXT_ALIAS,
  GLOBAL_CONTEXT_PACKAGE,
  GLOBAL_CONTEXT_SELECTOR_ALIAS,
  REACT_PACKAGE,
} from './constants';

type BabelPluginState = PluginPass & {
  importDeclarationPaths?: NodePath<types.ImportDeclaration>[];
  nativeExpressionPaths?: NodePath<types.CallExpression>[];
  contextSelectorExpressionPaths?: NodePath<types.CallExpression>[];
  nativeLocalName?: string;
  contextSelectorLocalName?: string;
};

interface PackageJSON {
  name: string;
  version: string;
}

/**
 * Checks that passed callee imports react context or context selector
 */
function isCreateContextCallee(
  path: NodePath<types.Expression | types.V8IntrinsicIdentifier>,
): path is NodePath<types.Identifier> {
  if (!path.isIdentifier) {
    return false;
  }

  return (
    path.referencesImport(REACT_PACKAGE, CREATE_CONTEXT_CALL) ||
    path.referencesImport(CONTEXT_SELECTOR_PACKAGE, CREATE_CONTEXT_CALL)
  );
}

/**
 *
 * @param packageName - name of the package to import
 * @param functionName - name of the createContext function
 * @returns a new import expression for global context
 *
 * @example import { createContext as __createGlobalContext } from '@global-context/react'
 */
function createGlobalContextImportDeclaration(packageName: string, isContextSelector: boolean) {
  const origFunction = isContextSelector ? 'createContextSelector' : 'createContext';
  const newFunction = isContextSelector ? GLOBAL_CONTEXT_SELECTOR_ALIAS : GLOBAL_CONTEXT_ALIAS;
  return types.importDeclaration(
    [types.importSpecifier(types.identifier(newFunction), types.identifier(origFunction))],
    types.stringLiteral(packageName),
  );
}

/**
 * @returns - An expression that creates a global context
 *
 * @example const MyContext = __createGlobalContext();
 */
function createGlobalContextCallExpression(options: {
  expressionPath: NodePath<types.CallExpression>;
  packageJson: PackageJSON;
  packageJsonPath: string;
  filePath: string;
  functionName: string;
}) {
  const { expressionPath, packageJson, packageJsonPath, filePath, functionName } = options;

  const args = expressionPath.get('arguments').map(arg => arg.node);
  if (!expressionPath.parentPath.isVariableDeclarator()) {
    return expressionPath.node;
  }

  // Use the relative path from package.json because the same package
  // can be installed under different paths in node_modules if they are duplicated
  const relativePath = relative(packageJsonPath, filePath);
  const id = expressionPath.parentPath.get('id') as NodePath<types.Identifier>;
  return types.callExpression(types.identifier(functionName), [
    ...args,
    types.stringLiteral(hash(`${relativePath}@${id.node.name}`)),
    types.stringLiteral(packageJson.name),
    types.stringLiteral(packageJson.version),
  ]);
}

/**
 * Checks if import statement import createContext() from React
 */
function hasReactImport(path: NodePath<types.ImportDeclaration>): boolean {
  return path.node.source.value === REACT_PACKAGE;
}

/**
 * Checks if import statement import createContext() from @fluentui/react-context-selector
 */
function hasContextSelectorImport(path: NodePath<types.ImportDeclaration>): boolean {
  return path.node.source.value === CONTEXT_SELECTOR_PACKAGE;
}

export const transformPlugin = declare((api): PluginObj<BabelPluginState> => {
  api.assertVersion(7);

  return {
    name: 'global-context',

    pre() {
      this.importDeclarationPaths = [];
      this.nativeExpressionPaths = [];
      this.contextSelectorExpressionPaths = [];
    },

    visitor: {
      Program: {
        exit(path, state) {
          if (
            state.filename === undefined ||
            !state.importDeclarationPaths?.length ||
            !state.nativeExpressionPaths ||
            !state.contextSelectorExpressionPaths
          ) {
            return;
          }

          const packageJsonPath = findUp.sync('package.json', { cwd: dirname(state.filename) });
          if (packageJsonPath === undefined) {
            return;
          }

          if (state.importDeclarationPaths.some(hasReactImport)) {
            // Adds import for global context
            path.unshiftContainer('body', createGlobalContextImportDeclaration(GLOBAL_CONTEXT_PACKAGE, false));
          }

          if (state.importDeclarationPaths.some(hasContextSelectorImport)) {
            // Adds import for global context selector
            path.unshiftContainer('body', createGlobalContextImportDeclaration(GLOBAL_CONTEXT_PACKAGE, true));
          }

          const packageJson: PackageJSON = JSON.parse(readFileSync(packageJsonPath).toString());
          // substitutes expressions of react createContext to global context
          for (const expressionPath of state.contextSelectorExpressionPaths) {
            expressionPath.replaceWith(
              createGlobalContextCallExpression({
                expressionPath,
                packageJson,
                packageJsonPath,
                filePath: state.filename,
                functionName: GLOBAL_CONTEXT_SELECTOR_ALIAS,
              }),
            );
          }

          for (const expressionPath of state.nativeExpressionPaths) {
            expressionPath.replaceWith(
              createGlobalContextCallExpression({
                expressionPath,
                packageJson,
                packageJsonPath,
                filePath: state.filename,
                functionName: GLOBAL_CONTEXT_ALIAS,
              }),
            );
          }
        },
      },

      /**
       * Finds imports of `react` or `@fluentui/react-context-selector`.
       * If `createContext` is explicitly imported, stores its imported name in state
       *
       * @example import { createContext as createMyContext } from 'react';
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration(path, state) {
        if (!hasReactImport(path) && !hasContextSelectorImport(path)) {
          return;
        }

        const native = hasReactImport(path);
        state.importDeclarationPaths?.push(path);

        for (const importSpecifier of path.node.specifiers) {
          if (
            types.isImportSpecifier(importSpecifier) &&
            types.isIdentifier(importSpecifier.imported) &&
            types.isIdentifier(importSpecifier.local) &&
            importSpecifier.imported.name === CREATE_CONTEXT_CALL
          ) {
            const localName = importSpecifier.local.name;
            if (native) {
              state.nativeLocalName = localName;
            } else {
              state.contextSelectorLocalName = localName;
            }
          }
        }
      },
      /**
       * Handles case when `createContext()` is `CallExpression`.
       *
       * @example createContext({})
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(path, state) {
        if (state.importDeclarationPaths?.length === 0) {
          return;
        }

        const calleePath = path.get('callee');

        if (!isCreateContextCallee(calleePath)) {
          return;
        }

        if (types.isCallExpression(path.node) && types.isIdentifier(path.node.callee)) {
          if (path.node.callee.name === state.nativeLocalName) {
            state.nativeExpressionPaths?.push(path);
          }
          if (path.node.callee.name === state.contextSelectorLocalName) {
            state.contextSelectorExpressionPaths?.push(path);
          }
        }
      },

      /**
       * Handles case when `createContext()` is inside `MemberExpression`.
       * Assumes that context selector is not used this way
       *
       * @example module.createContext({})
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      MemberExpression(expressionPath, state) {
        const objectPath = expressionPath.get('object');
        const propertyPath = expressionPath.get('property');

        const isCreateContextCall =
          objectPath.isIdentifier({ name: 'React' }) && propertyPath.isIdentifier({ name: 'createContext' });

        if (!isCreateContextCall) {
          return;
        }

        const parentPath = expressionPath.parentPath;

        if (!parentPath.isCallExpression()) {
          return;
        }
        state.nativeExpressionPaths?.push(parentPath);
      },
    },
  };
});
