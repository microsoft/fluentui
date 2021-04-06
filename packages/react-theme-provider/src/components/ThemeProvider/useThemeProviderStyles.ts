import { makeStyles, ax } from '@fluentui/react-make-styles';
import { ThemeProviderState } from './ThemeProvider.types';

const useStyles = makeStyles({
  root: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[300],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
});

/** Applies style classnames to slots */
export const useThemeProviderStyles = (state: ThemeProviderState) => {
  const styles = useStyles();
  state.className = ax(styles.root, state.className);
  return state;
};
