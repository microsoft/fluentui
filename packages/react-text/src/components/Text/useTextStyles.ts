import { ax, makeStyles } from '@fluentui/react-make-styles';
import { TextState } from './Text.types';

const useStyles = makeStyles({
  root: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
  caption: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
    lineHeight: theme.global.type.lineHeights.base[200],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
  body: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
  subHeadline: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
    lineHeight: theme.global.type.lineHeights.base[400],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  headline: theme => ({
    fontSize: theme.global.type.fontSizes.base[500],
    lineHeight: theme.global.type.lineHeights.base[500],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  title3: theme => ({
    fontSize: theme.global.type.fontSizes.base[600],
    lineHeight: theme.global.type.lineHeights.base[600],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  title2: theme => ({
    fontSize: theme.global.type.fontSizes.hero[700],
    lineHeight: theme.global.type.lineHeights.hero[700],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  title1: theme => ({
    fontSize: theme.global.type.fontSizes.hero[800],
    lineHeight: theme.global.type.lineHeights.hero[800],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  largeTitle: theme => ({
    fontSize: theme.global.type.fontSizes.hero[900],
    lineHeight: theme.global.type.lineHeights.hero[900],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  display: theme => ({
    fontSize: theme.global.type.fontSizes.hero[1000],
    lineHeight: theme.global.type.lineHeights.hero[1000],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
});

export function useTextStyles(state: TextState): TextState {
  const styles = useStyles();
  state.className = ax('ms-Text', styles.root, state.variant && styles[state.variant], state.className);

  return state;
}
