import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { textClassNames, type TextState } from '@fluentui/react-text';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    textAlign: 'start',
    display: 'inline',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'clip',
  },
  nowrap: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  truncate: {
    textOverflow: 'ellipsis',
  },
  block: {
    display: 'block',
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  strikethroughUnderline: {
    textDecorationLine: 'line-through underline',
  },
  base100: {
    fontSize: semanticTokens.textGlobalCaption2FontSize,
    lineHeight: semanticTokens.textGlobalCaption2LineHeight,
  },
  base200: {
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
  },
  base400: {
    fontSize: semanticTokens.textGlobalBody2FontSize,
    lineHeight: semanticTokens.textGlobalBody2LineHeight,
  },
  base500: {
    fontSize: semanticTokens.textGlobalBody1FontSize,
    lineHeight: semanticTokens.textGlobalBody1LineHeight,
  },
  base600: {
    fontSize: semanticTokens.textGlobalSubtitle2FontSize,
    lineHeight: semanticTokens.textGlobalSubtitle2LineHeight,
  },
  hero700: {
    fontSize: semanticTokens.textGlobalSubtitle1FontSize,
    lineHeight: semanticTokens.textGlobalSubtitle1LineHeight,
  },
  hero800: {
    fontSize: semanticTokens.textGlobalTitle2FontSize,
    lineHeight: semanticTokens.textGlobalTitle2LineHeight,
  },
  hero900: {
    fontSize: semanticTokens.textGlobalTitle1FontSize,
    lineHeight: semanticTokens.textGlobalTitle1LineHeight,
  },
  hero1000: {
    fontSize: semanticTokens.textGlobalDisplay2FontSize,
    lineHeight: semanticTokens.textGlobalDisplay2LineHeight,
  },
  monospace: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  numeric: {
    fontFamily: tokens.fontFamilyNumeric,
  },
  weightMedium: {
    fontWeight: tokens.fontWeightMedium,
  },
  weightSemibold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  weightBold: {
    fontWeight: tokens.fontWeightBold,
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignEnd: {
    textAlign: 'end',
  },
  alignJustify: {
    textAlign: 'justify',
  },
});

/**
 * Apply styling to the Text slots based on the state
 */
export const useSemanticTextStyles = (_state: unknown): TextState => {
  'use no memo';

  const state = _state as TextState;

  const styles = useStyles();

  state.root.className = mergeClasses(
    textClassNames.root,
    styles.root,
    state.wrap === false && styles.nowrap,
    state.truncate && styles.truncate,
    state.block && styles.block,
    state.italic && styles.italic,
    state.underline && styles.underline,
    state.strikethrough && styles.strikethrough,
    state.underline && state.strikethrough && styles.strikethroughUnderline,
    state.size === 100 && styles.base100,
    state.size === 200 && styles.base200,
    state.size === 400 && styles.base400,
    state.size === 500 && styles.base500,
    state.size === 600 && styles.base600,
    state.size === 700 && styles.hero700,
    state.size === 800 && styles.hero800,
    state.size === 900 && styles.hero900,
    state.size === 1000 && styles.hero1000,
    state.font === 'monospace' && styles.monospace,
    state.font === 'numeric' && styles.numeric,
    state.weight === 'medium' && styles.weightMedium,
    state.weight === 'semibold' && styles.weightSemibold,
    state.weight === 'bold' && styles.weightBold,
    state.align === 'center' && styles.alignCenter,
    state.align === 'end' && styles.alignEnd,
    state.align === 'justify' && styles.alignJustify,
    state.root.className,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
