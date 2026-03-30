// @ts-check
const createRule = require('../utils/createRule');

/**
 * @import { TSESTree } from '@typescript-eslint/utils'
 */

// Common hardcoded color patterns
const COLOR_REGEX = /^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|transparent|inherit|currentColor)$/;
// Common hardcoded pixel/rem/em values for spacing
const SPACING_REGEX = /^\d+(\.\d+)?(px|rem|em)$/;

// CSS properties that typically use design tokens
const TOKEN_PROPERTIES = new Set([
  'color',
  'backgroundColor',
  'borderColor',
  'outlineColor',
  'borderTopColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'gap',
  'rowGap',
  'columnGap',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'fontFamily',
  'boxShadow',
  'borderWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'outlineWidth',
]);

// Values that are always OK (CSS keywords, zero, etc.)
const ALLOWED_VALUES = new Set([
  '0',
  'auto',
  'none',
  'inherit',
  'initial',
  'unset',
  'revert',
  '100%',
  '50%',
  'normal',
  'bold',
  'nowrap',
  'wrap',
  'hidden',
  'visible',
  'solid',
  'dashed',
  'dotted',
]);

module.exports = createRule({
  name: 'no-hardcoded-style-values',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce usage of design tokens instead of hardcoded values in Griffel styles',
    },
    messages: {
      hardcodedColor:
        "Hardcoded color '{{value}}' in '{{property}}'. Use a design token from @fluentui/react-theme instead (e.g., tokens.colorNeutralForeground1). See docs/architecture/design-tokens.md",
      hardcodedSpacing:
        "Hardcoded spacing '{{value}}' in '{{property}}'. Use a design token from @fluentui/react-theme instead (e.g., tokens.spacingVerticalM). See docs/architecture/design-tokens.md",
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    const filename = context.filename || context.getFilename();

    // Only apply to .styles.ts files
    if (!filename.endsWith('.styles.ts')) {
      return {};
    }

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Property(node) {
        // Only check properties inside makeStyles calls
        if (!isInsideMakeStyles(node)) {
          return;
        }

        const key = getPropertyName(node);
        if (!key || !TOKEN_PROPERTIES.has(key)) {
          return;
        }

        const value = node.value;

        if (value.type === 'Literal' && typeof value.value === 'string') {
          const strValue = value.value;

          if (ALLOWED_VALUES.has(strValue)) {
            return;
          }

          if (COLOR_REGEX.test(strValue)) {
            context.report({
              node: value,
              messageId: 'hardcodedColor',
              data: { value: strValue, property: key },
            });
          } else if (SPACING_REGEX.test(strValue)) {
            context.report({
              node: value,
              messageId: 'hardcodedSpacing',
              data: { value: strValue, property: key },
            });
          }
        }
      },
    };
  },
});

/**
 * Check if a node is inside a makeStyles() call
 * @param {TSESTree.Node} node
 * @returns {boolean}
 */
function isInsideMakeStyles(node) {
  let current = node.parent;
  while (current) {
    if (
      current.type === 'CallExpression' &&
      current.callee.type === 'Identifier' &&
      current.callee.name === 'makeStyles'
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

/**
 * Get the name of an object property
 * @param {TSESTree.Property} node
 * @returns {string | null}
 */
function getPropertyName(node) {
  if (node.key.type === 'Identifier') {
    return node.key.name;
  }
  if (node.key.type === 'Literal' && typeof node.key.value === 'string') {
    return node.key.value;
  }
  return null;
}
