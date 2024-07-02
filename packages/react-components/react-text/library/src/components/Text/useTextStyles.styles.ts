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
    fontFamily: `var(--ctrl-token-Text-2655, var(--semantic-token-Text-2656, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--ctrl-token-Text-2657, var(--semantic-token-Text-2658, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--ctrl-token-Text-2659, var(--semantic-token-Text-2660, ${tokens.lineHeightBase300}))`,
    fontWeight: `var(--ctrl-token-Text-2661, var(--semantic-token-Text-2662, ${tokens.fontWeightRegular}))`,
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
    fontSize: `var(--ctrl-token-Text-2663, var(--semantic-token-Text-2664, ${tokens.fontSizeBase100}))`,
    lineHeight: `var(--ctrl-token-Text-2665, var(--semantic-token-Text-2666, ${tokens.lineHeightBase100}))`,
  },
  base200: {
    fontSize: `var(--ctrl-token-Text-2667, var(--semantic-token-Text-2668, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--ctrl-token-Text-2669, var(--semantic-token-Text-2670, ${tokens.lineHeightBase200}))`,
  },
  base400: {
    fontSize: `var(--ctrl-token-Text-2671, var(--semantic-token-Text-2672, ${tokens.fontSizeBase400}))`,
    lineHeight: `var(--ctrl-token-Text-2673, var(--semantic-token-Text-2674, ${tokens.lineHeightBase400}))`,
  },
  base500: {
    fontSize: `var(--ctrl-token-Text-2675, var(--semantic-token-Text-2676, ${tokens.fontSizeBase500}))`,
    lineHeight: `var(--ctrl-token-Text-2677, var(--semantic-token-Text-2678, ${tokens.lineHeightBase500}))`,
  },
  base600: {
    fontSize: `var(--ctrl-token-Text-2679, var(--semantic-token-Text-2680, ${tokens.fontSizeBase600}))`,
    lineHeight: `var(--ctrl-token-Text-2681, var(--semantic-token-Text-2682, ${tokens.lineHeightBase600}))`,
  },
  hero700: {
    fontSize: `var(--ctrl-token-Text-2683, var(--semantic-token-Text-2684, ${tokens.fontSizeHero700}))`,
    lineHeight: `var(--ctrl-token-Text-2685, var(--semantic-token-Text-2686, ${tokens.lineHeightHero700}))`,
  },
  hero800: {
    fontSize: `var(--ctrl-token-Text-2687, var(--semantic-token-Text-2688, ${tokens.fontSizeHero800}))`,
    lineHeight: `var(--ctrl-token-Text-2689, var(--semantic-token-Text-2690, ${tokens.lineHeightHero800}))`,
  },
  hero900: {
    fontSize: `var(--ctrl-token-Text-2691, var(--semantic-token-Text-2692, ${tokens.fontSizeHero900}))`,
    lineHeight: `var(--ctrl-token-Text-2693, var(--semantic-token-Text-2694, ${tokens.lineHeightHero900}))`,
  },
  hero1000: {
    fontSize: `var(--ctrl-token-Text-2695, var(--semantic-token-Text-2696, ${tokens.fontSizeHero1000}))`,
    lineHeight: `var(--ctrl-token-Text-2697, var(--semantic-token-Text-2698, ${tokens.lineHeightHero1000}))`,
  },
  monospace: {
    fontFamily: `var(--ctrl-token-Text-2699, var(--semantic-token-Text-2700, ${tokens.fontFamilyMonospace}))`,
  },
  numeric: {
    fontFamily: `var(--ctrl-token-Text-2701, var(--semantic-token-Text-2702, ${tokens.fontFamilyNumeric}))`,
  },
  weightMedium: {
    fontWeight: `var(--ctrl-token-Text-2703, var(--semantic-token-Text-2704, ${tokens.fontWeightMedium}))`,
  },
  weightSemibold: {
    fontWeight: `var(--ctrl-token-Text-2705, var(--semantic-token-Text-2706, ${tokens.fontWeightSemibold}))`,
  },
  weightBold: {
    fontWeight: `var(--ctrl-token-Text-2707, var(--semantic-token-Text-2708, ${tokens.fontWeightBold}))`,
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
