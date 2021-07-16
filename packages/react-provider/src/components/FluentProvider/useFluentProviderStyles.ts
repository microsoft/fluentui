import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { FluentProviderState } from './FluentProvider.types';

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
  // Theme override is passed here to use a proper theme otherwise it will usa a theme from a parent
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);
  return state;
};
