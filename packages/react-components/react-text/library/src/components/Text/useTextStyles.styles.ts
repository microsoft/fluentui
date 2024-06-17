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
    fontFamily: `var(--2655, var(--2656, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--2657, var(--2658, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--2659, var(--2660, ${tokens.lineHeightBase300}))`,
    fontWeight: `var(--2661, var(--2662, ${tokens.fontWeightRegular}))`,
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
    fontSize: `var(--2663, var(--2664, ${tokens.fontSizeBase100}))`,
    lineHeight: `var(--2665, var(--2666, ${tokens.lineHeightBase100}))`,
  },
  base200: {
    fontSize: `var(--2667, var(--2668, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--2669, var(--2670, ${tokens.lineHeightBase200}))`,
  },
  base400: {
    fontSize: `var(--2671, var(--2672, ${tokens.fontSizeBase400}))`,
    lineHeight: `var(--2673, var(--2674, ${tokens.lineHeightBase400}))`,
  },
  base500: {
    fontSize: `var(--2675, var(--2676, ${tokens.fontSizeBase500}))`,
    lineHeight: `var(--2677, var(--2678, ${tokens.lineHeightBase500}))`,
  },
  base600: {
    fontSize: `var(--2679, var(--2680, ${tokens.fontSizeBase600}))`,
    lineHeight: `var(--2681, var(--2682, ${tokens.lineHeightBase600}))`,
  },
  hero700: {
    fontSize: `var(--2683, var(--2684, ${tokens.fontSizeHero700}))`,
    lineHeight: `var(--2685, var(--2686, ${tokens.lineHeightHero700}))`,
  },
  hero800: {
    fontSize: `var(--2687, var(--2688, ${tokens.fontSizeHero800}))`,
    lineHeight: `var(--2689, var(--2690, ${tokens.lineHeightHero800}))`,
  },
  hero900: {
    fontSize: `var(--2691, var(--2692, ${tokens.fontSizeHero900}))`,
    lineHeight: `var(--2693, var(--2694, ${tokens.lineHeightHero900}))`,
  },
  hero1000: {
    fontSize: `var(--2695, var(--2696, ${tokens.fontSizeHero1000}))`,
    lineHeight: `var(--2697, var(--2698, ${tokens.lineHeightHero1000}))`,
  },
  monospace: {
    fontFamily: `var(--2699, var(--2700, ${tokens.fontFamilyMonospace}))`,
  },
  numeric: {
    fontFamily: `var(--2701, var(--2702, ${tokens.fontFamilyNumeric}))`,
  },
  weightMedium: {
    fontWeight: `var(--2703, var(--2704, ${tokens.fontWeightMedium}))`,
  },
  weightSemibold: {
    fontWeight: `var(--2705, var(--2706, ${tokens.fontWeightSemibold}))`,
  },
  weightBold: {
    fontWeight: `var(--2707, var(--2708, ${tokens.fontWeightBold}))`,
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
