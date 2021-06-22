import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { TextState } from './Text.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
    fontWeight: theme.global.type.fontWeights.regular,
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
    fontSize: theme.global.type.fontSizes.base[100],
    lineHeight: theme.global.type.lineHeights.base[100],
  }),
  base200: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
    lineHeight: theme.global.type.lineHeights.base[200],
  }),
  base400: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
    lineHeight: theme.global.type.lineHeights.base[400],
  }),
  base500: theme => ({
    fontSize: theme.global.type.fontSizes.base[500],
    lineHeight: theme.global.type.lineHeights.base[500],
  }),
  base600: theme => ({
    fontSize: theme.global.type.fontSizes.base[600],
    lineHeight: theme.global.type.lineHeights.base[600],
  }),
  hero700: theme => ({
    fontSize: theme.global.type.fontSizes.hero[700],
    lineHeight: theme.global.type.lineHeights.hero[700],
  }),
  hero800: theme => ({
    fontSize: theme.global.type.fontSizes.hero[800],
    lineHeight: theme.global.type.lineHeights.hero[800],
  }),
  hero900: theme => ({
    fontSize: theme.global.type.fontSizes.hero[900],
    lineHeight: theme.global.type.lineHeights.hero[900],
  }),
  hero1000: theme => ({
    fontSize: theme.global.type.fontSizes.hero[1000],
    lineHeight: theme.global.type.lineHeights.hero[1000],
  }),

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Text slots based on the state
 */
export const useTextStyles = (state: TextState): TextState => {
  const styles = useStyles();
  state.className = mergeClasses(
    styles.root,
    state.wrap === false && styles.nowrap,
    state.truncate === true && styles.truncate,
    state.block === true && styles.block,
    state.italic === true && styles.italic,
    state.underline === true && styles.underline,
    state.strikethrough === true && styles.strikethrough,
    state.underline === true && state.strikethrough === true && styles.strikethroughUnderline,
    state.size === 100 && styles.base100,
    state.size === 200 && styles.base200,
    state.size === 400 && styles.base400,
    state.size === 500 && styles.base500,
    state.size === 600 && styles.base600,
    state.size === 700 && styles.hero700,
    state.size === 800 && styles.hero800,
    state.size === 900 && styles.hero900,
    state.size === 1000 && styles.hero1000,
    state.className,
  );

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
