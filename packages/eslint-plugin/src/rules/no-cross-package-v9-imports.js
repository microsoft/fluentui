// @ts-check
const { AST_NODE_TYPES } = require('@typescript-eslint/experimental-utils');
const createRule = require('../utils/createRule');

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
     * @type {import("@typescript-eslint/types/dist/ts-estree").Range}
     */
    let reactComponentsImportNodeRange;

    return {
      ImportDeclaration: imprt => {
        if (typeof imprt.source.value !== 'string') {
          return;
        }

        const specifiers = imprt.specifiers;

        if (
          imprt.source &&
          imprt.source.type === AST_NODE_TYPES.Literal &&
          imprt.source.value === '@fluentui/react-components'
        ) {
          reactComponentsImportNodeRange = specifiers[specifiers.length - 1].range;
        }

        if (
          (imprt.source &&
            imprt.source.type === AST_NODE_TYPES.Literal &&
            imprt.source.value !== '@fluentui/react-components' &&
            imprt.source.value.includes('@fluentui/react-')) ||
          imprt.source.value.includes('@griffel/react')
        ) {
          if (!reactComponentsImportNodeRange) {
            reactComponentsImportNodeRange = specifiers[specifiers.length - 1].range;
            context.report({
              node: imprt,
              messageId: 'crossPackageImport',
              data: { packageName: imprt.source.value },
              fix: fixer => {
                const [start, end] = imprt.source.range;
                return fixer.replaceTextRange([start + 1, end - 1], '@fluentui/react-components');
              },
            });
          } else {
            context.report({
              node: imprt,
              messageId: 'crossPackageImport',
              data: { packageName: imprt.source.value },
              fix: fixer => {
                const importsToAdd = `, ${imprt.specifiers.map(specifier => specifier.local.name).join(', ')}`;
                return [fixer.insertTextAfterRange(reactComponentsImportNodeRange, importsToAdd), fixer.remove(imprt)];
              },
            });
          }
        }
      },
    };
  },
});
