import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { FluentProviderState } from './FluentProvider.types';

const useStyles = makeStyles({
  root: theme => ({
    color: theme.colorNeutralForeground1,
    backgroundColor: theme.colorNeutralBackground1,
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase300,
    fontWeight: theme.fontWeightRegular,
  }),
});

/** Applies style classnames to slots */
export const useFluentProviderStyles = (state: FluentProviderState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(state.themeClassName, styles.root, state.root.className);

  return state;
};
