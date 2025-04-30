import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TextSlots, TextState } from './Text.types';
import { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const textClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Text',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontfamily,
    fontSize: semanticTokens.textGlobalBody3Fontsize,
    lineHeight: semanticTokens.textGlobalBody3Lineheight,
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
    fontSize: semanticTokens.textGlobalCaption2Fontsize,
    lineHeight: semanticTokens.textGlobalCaption2Lineheight,
  },
  base200: {
    fontSize: semanticTokens.textGlobalCaption1Fontsize,
    lineHeight: semanticTokens.textGlobalCaption1Lineheight,
  },
  base400: {
    fontSize: semanticTokens.textGlobalBody2Fontsize,
    lineHeight: semanticTokens.textGlobalBody2Lineheight,
  },
  base500: {
    fontSize: semanticTokens.textGlobalBody1Fontsize,
    lineHeight: semanticTokens.textGlobalBody1Lineheight,
  },
  base600: {
    fontSize: semanticTokens.textGlobalSubtitle2Fontsize,
    lineHeight: semanticTokens.textGlobalSubtitle2Lineheight,
  },
  hero700: {
    fontSize: semanticTokens.textGlobalSubtitle1Fontsize,
    lineHeight: semanticTokens.textGlobalSubtitle1Lineheight,
  },
  hero800: {
    fontSize: semanticTokens.textGlobalTitle2Fontsize,
    lineHeight: semanticTokens.textGlobalTitle2Lineheight,
  },
  hero900: {
    fontSize: semanticTokens.textGlobalTitle1Fontsize,
    lineHeight: semanticTokens.textGlobalTitle1Lineheight,
  },
  hero1000: {
    fontSize: semanticTokens.textGlobalDisplay2Fontsize,
    lineHeight: semanticTokens.textGlobalDisplay2Lineheight,
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
export const useTextStyles_unstable = (state: TextState): TextState => {
  'use no memo';

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
  );

  return state;
};
