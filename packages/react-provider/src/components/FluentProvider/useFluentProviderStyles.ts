import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { FluentProviderState } from './FluentProvider.types';

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
export const useFluentProviderStyles = (state: FluentProviderState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(state.themeClassName, styles.root, state.root.className);

  return state;
};
