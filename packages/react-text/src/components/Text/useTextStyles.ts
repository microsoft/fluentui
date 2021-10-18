import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { TextState } from './Text.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
    fontWeight: theme.fontWeightRegular,
    textAlign: 'start',
    display: 'inline',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'clip',
  }),
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
    textDecoration: 'underline',
  },
  strikethrough: {
    textDecoration: 'line-through',
  },
  strikethroughUnderline: {
    textDecoration: 'line-through underline',
  },
  base100: theme => ({
    fontSize: theme.fontSizeBase100,
    lineHeight: theme.lineHeightBase100,
  }),
  base200: theme => ({
    fontSize: theme.fontSizeBase200,
    lineHeight: theme.lineHeightBase200,
  }),
  base400: theme => ({
    fontSize: theme.fontSizeBase400,
    lineHeight: theme.lineHeightBase400,
  }),
  base500: theme => ({
    fontSize: theme.fontSizeBase500,
    lineHeight: theme.lineHeightBase500,
  }),
  base600: theme => ({
    fontSize: theme.fontSizeBase600,
    lineHeight: theme.lineHeightBase600,
  }),
  hero700: theme => ({
    fontSize: theme.fontSizeHero700,
    lineHeight: theme.lineHeightHero700,
  }),
  hero800: theme => ({
    fontSize: theme.fontSizeHero800,
    lineHeight: theme.lineHeightHero800,
  }),
  hero900: theme => ({
    fontSize: theme.fontSizeHero900,
    lineHeight: theme.lineHeightHero900,
  }),
  hero1000: theme => ({
    fontSize: theme.fontSizeHero1000,
    lineHeight: theme.lineHeightHero1000,
  }),
  monospace: theme => ({
    fontFamily: theme.fontFamilyMonospace,
  }),
  numeric: theme => ({
    fontFamily: theme.fontFamilyNumeric,
  }),
  weightMedium: theme => ({
    fontWeight: theme.fontWeightMedium,
  }),
  weightSemibold: theme => ({
    fontWeight: theme.fontWeightSemibold,
  }),
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
export const useTextStyles = (state: TextState): TextState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
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
    state.align === 'center' && styles.alignCenter,
    state.align === 'end' && styles.alignEnd,
    state.align === 'justify' && styles.alignJustify,
    state.root.className,
  );

  return state;
};
