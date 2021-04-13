import { makeStylesWithCustomTheme, ax } from '@fluentui/react-make-styles';
import { ThemeProviderState } from './ThemeProvider.types';

const useStyles = makeStylesWithCustomTheme({
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
  // Theme override is passed here to use a proper theme otherwise it will usa a theme from a parent
  const styles = useStyles(state.theme);
  state.className = ax(styles.root, state.className);
  return state;
};
