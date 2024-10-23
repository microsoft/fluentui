import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TextSlots, TextState } from './Text.types';
import { SlotClassNames } from '@fluentui/react-utilities';

export const textClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Text',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightRegular,
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
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
  },
  base200: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  base400: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  base500: {
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
  base600: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
  },
  hero700: {
    fontSize: tokens.fontSizeHero700,
    lineHeight: tokens.lineHeightHero700,
  },
  hero800: {
    fontSize: tokens.fontSizeHero800,
    lineHeight: tokens.lineHeightHero800,
  },
  hero900: {
    fontSize: tokens.fontSizeHero900,
    lineHeight: tokens.lineHeightHero900,
  },
  hero1000: {
    fontSize: tokens.fontSizeHero1000,
    lineHeight: tokens.lineHeightHero1000,
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
