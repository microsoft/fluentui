// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/experimental-utils');
const createRule = require('../utils/createRule');
const getAllPackageInfo = require('../utils/getAllPackageInfo');

const V9_PKG_NAME = '@fluentui/react-components';

module.exports = createRule({
  name: 'no-cross-package-v9-imports',
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensures that v9 component imports are only coming from @fluentui/react-components.',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      crossPackageImport:
        'Cross package import from {{ packageName }} detected. Please import only from @fluentui/react-components',
    },
    fixable: 'code',
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    /**
     * @type {import("@typescript-eslint/types/dist/ts-estree").ImportClause}
     */
    let reactComponentsImportNode;

    const v9PackageDeps = getAllPackageInfo()[V9_PKG_NAME].packageJson.dependencies;

    return {
      ImportDeclaration: imprt => {
        if (!imprt.source || (imprt.source && imprt.source.type !== AST_NODE_TYPES.Literal)) {
          return;
        }

        if (typeof imprt.source.value !== 'string') {
          return;
        }

        const specifiers = imprt.specifiers;

        if (imprt.source.value === V9_PKG_NAME && !reactComponentsImportNode) {
          reactComponentsImportNode = specifiers[specifiers.length - 1];
        }

        if (v9PackageDeps[imprt.source.value] && imprt.source.value !== V9_PKG_NAME) {
          if (!reactComponentsImportNode) {
            reactComponentsImportNode = specifiers[specifiers.length - 1];
            context.report({
              node: imprt,
              messageId: 'crossPackageImport',
              data: { packageName: imprt.source.value },
              fix: fixer => {
                const [start, end] = imprt.source.range;
                return fixer.replaceTextRange([start + 1, end - 1], V9_PKG_NAME);
              },
            });
          } else {
            context.report({
              node: imprt,
              messageId: 'crossPackageImport',
              data: { packageName: imprt.source.value },
              fix: fixer => {
                const importsToAdd = `, ${imprt.specifiers.map(specifier => specifier.local.name).join(', ')}`;
                return [fixer.insertTextAfterRange(reactComponentsImportNode.range, importsToAdd), fixer.remove(imprt)];
              },
            });
          }
        }
      },
    };
  },
});
