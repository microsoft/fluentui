// @ts-check
const { ESLintUtils, AST_NODE_TYPES } = require('@typescript-eslint/experimental-utils');
const createRule = require('../../utils/createRule');
const minimatch = require('minimatch');

/** @typedef { import('@typescript-eslint/experimental-utils').TSESTree.VariableDeclarator } VariableDeclarator*/
/** @typedef { import('@typescript-eslint/experimental-utils').TSESTree.ExportSpecifier} ExportSpecifier */
/**
 * @typedef {{
 *  exclude?: string[];
 * }} Options
 */

/** @type {Options} */
const defaultOptions = {};

module.exports = createRule({
  name: 'ban-context-export',
  defaultOptions: [],
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          exclude: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'List of files to exclude',
          },
        },
        additionalProperties: false,
      },
    ],
    type: 'problem',
    docs: {
      description: 'Ban export of React context or context selector objects',
      category: 'Best Practices',
      recommended: 'error',
    },
    messages: {
      nativeContext: '{{exportName}} should not be exported directly',
      contextSelector: '{{exportName}} should not be exported directly',
    },
  },
  create(context) {
    const rawOptions = /** @type {Options[]} */ (context.options);
    const { exclude = [] } = rawOptions.length ? rawOptions[0] : defaultOptions;
    const { program, esTreeNodeToTSNodeMap } = ESLintUtils.getParserServices(context);
    /** @type {import("typescript").TypeChecker | undefined} */
    let typeChecker;

    /**
     * @param { ExportSpecifier | VariableDeclarator } node
     * @param {string} exportName
     */
    function checkContextType(node, exportName) {
      const currentFileName = context.getFilename();
      if (exclude.some(pattern => minimatch(currentFileName, pattern))) {
        return;
      }

      const isTopLevelExport = currentFileName.endsWith('src/index.ts');
      if (!isTopLevelExport) {
        return;
      }

      if (!typeChecker) {
        typeChecker = program.getTypeChecker();
      }

      const tsNode = esTreeNodeToTSNodeMap.get(node);
      const typeNode = typeChecker.getTypeAtLocation(tsNode);

      // @fluentui/react-context-selector
      if (typeNode.aliasSymbol?.name === 'Context' && typeNode.aliasSymbol.declarations?.length) {
        const firstDeclaration = typeNode.aliasSymbol.declarations[0];
        const fileName = firstDeclaration.parent.getSourceFile().fileName;
        if (fileName.includes('react-context-selector')) {
          context.report({
            node,
            messageId: 'contextSelector',
            data: {
              exportName,
              filename: context.getFilename(),
            },
          });
        }
      }

      // Native react
      if (typeNode.symbol?.name === 'Context' && typeNode.symbol.declarations?.length) {
        const firstDeclaration = typeNode.symbol.declarations[0];
        const fileName = firstDeclaration.parent.getSourceFile().fileName;
        if (/\/node_modules\/@types\/react\//.test(fileName)) {
          context.report({
            node,
            messageId: 'nativeContext',
            data: {
              exportName,
              filename: context.getFilename(),
            },
          });
        }
      }
    }

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportNamedDeclaration(exportNamedDeclaration) {
        if (exportNamedDeclaration.declaration?.type === AST_NODE_TYPES.VariableDeclaration) {
          /** @type { import('@typescript-eslint/experimental-utils').TSESTree.VariableDeclaration } */
          const variableDeclaration = exportNamedDeclaration.declaration;
          variableDeclaration.declarations.forEach(declaration => {
            let identifierName = 'unknown';
            if (declaration.id.type === AST_NODE_TYPES.Identifier) {
              /** @type { import('@typescript-eslint/experimental-utils').TSESTree.Identifier } */
              const identifier = declaration.id;
              identifierName = identifier.name;
            }

            checkContextType(declaration, identifierName);
          });
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportSpecifier(exportSpecifier) {
        if (exportSpecifier.exported.name.includes('Context')) {
          checkContextType(exportSpecifier, exportSpecifier.exported.name);
        }
      },
    };
  },
});
