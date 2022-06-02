import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
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
    display: 'inline',
    whiteSpace: 'normal',
    ...shorthands.overflow('visible'),
    textOverflow: 'clip',
  },
  nowrap: {
    whiteSpace: 'nowrap',
    ...shorthands.overflow('hidden'),
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
  base300: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
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
  fontBase: {
    fontFamily: tokens.fontFamilyBase,
  },
  fontMonospace: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  fontNumeric: {
    fontFamily: tokens.fontFamilyNumeric,
  },
  weightRegular: {
    fontWeight: tokens.fontWeightRegular,
  },
  weightMedium: {
    fontWeight: tokens.fontWeightMedium,
  },
  weightSemibold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  alignStart: {
    textAlign: 'start',
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
  const styles = useStyles();

  const sizeMap = {
    none: undefined,
    100: styles.base100,
    200: styles.base200,
    300: styles.base300,
    400: styles.base400,
    500: styles.base500,
    600: styles.base600,
    700: styles.hero700,
    800: styles.hero800,
    900: styles.hero900,
    1000: styles.hero1000,
  } as const;

  const fontMap = {
    none: undefined,
    base: styles.fontBase,
    monospace: styles.fontMonospace,
    numeric: styles.fontNumeric,
  } as const;

  const weightMap = {
    none: undefined,
    regular: styles.weightRegular,
    medium: styles.weightMedium,
    semibold: styles.weightSemibold,
  } as const;

  const alignMap = {
    none: undefined,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    justify: styles.alignJustify,
  } as const;

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
    sizeMap[state.size],
    fontMap[state.font],
    weightMap[state.weight],
    alignMap[state.align],
    state.root.className,
  );

  return state;
};
