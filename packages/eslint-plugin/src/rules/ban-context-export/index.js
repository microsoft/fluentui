// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/experimental-utils');
const minimatch = require('minimatch');

const createRule = require('../../utils/createRule');
const { getTypeServices } = require('../../utils/type-services');

/** @typedef { import('@typescript-eslint/experimental-utils').TSESTree.VariableDeclarator } VariableDeclarator*/
/** @typedef { import('@typescript-eslint/experimental-utils').TSESTree.ExportSpecifier} ExportSpecifier */
/**
 * @typedef {{
 *  exclude?: string[];
 * }} Options
 */

module.exports = createRule({
  name: 'ban-context-export',
  defaultOptions: /** @type {ReadonlyArray<Options>} */ ([{}]),
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
    const [{ exclude = /** @type string[]*/ ([]) } = {}] = context.options;

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

      const { getType } = getTypeServices(context);

      const type = getType(node);

      /**
       *
       * @param {{
          typeProperty: Extract<keyof import('typescript').Type, 'symbol' | 'aliasSymbol'>
          messageId: Parameters<typeof context.report>[0]['messageId']
          fileNameCheck:(fileName:string)=>boolean;
        }} options
       */
      function reportViolation(options) {
        const typeSymbol = type[options.typeProperty];

        if (!typeSymbol) {
          return;
        }

        if (typeSymbol.name === 'Context' && typeSymbol.declarations?.length) {
          const firstDeclaration = typeSymbol.declarations[0];
          const fileName = firstDeclaration.parent.getSourceFile().fileName;

          if (options.fileNameCheck(fileName)) {
            context.report({
              node,
              messageId: options.messageId,
              data: {
                exportName,
                filename: context.getFilename(),
              },
            });
          }
        }
      }

      reportViolation({
        typeProperty: 'aliasSymbol',
        messageId: 'contextSelector',
        fileNameCheck: fileName => fileName.includes('react-context-selector'),
      });

      const nativeContextFileNamePathRegexp = /\/node_modules\/@types\/react\//;
      reportViolation({
        typeProperty: 'symbol',
        messageId: 'nativeContext',
        fileNameCheck: fileName => nativeContextFileNamePathRegexp.test(fileName),
      });
    }

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportNamedDeclaration(exportNamedDeclaration) {
        if (exportNamedDeclaration.declaration?.type === AST_NODE_TYPES.VariableDeclaration) {
          const variableDeclaration = exportNamedDeclaration.declaration;
          variableDeclaration.declarations.forEach(declaration => {
            if (declaration.id.type === AST_NODE_TYPES.Identifier) {
              const identifier = declaration.id;
              const identifierName = identifier.name;

              checkContextType(declaration, identifierName);

              return;
            }

            checkContextType(declaration, 'unknown');
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
