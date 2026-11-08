/**
 * CSS variable names used internally for uniform styling in Card.
 *
 * Extracted into a dedicated module so descendants (e.g. CardPreview styles)
 * can reference them without creating a circular import via `useCardStyles.styles.ts`,
 * which itself imports class names from descendant components.
 */
export const cardCSSVars = {
  cardSizeVar: '--fui-Card--size',
  cardBorderRadiusVar: '--fui-Card--border-radius',
  cardChildMarginVar: '--fui-Card--child-margin',
};
