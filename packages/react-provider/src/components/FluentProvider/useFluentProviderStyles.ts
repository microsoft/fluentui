import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { FluentProviderState } from './FluentProvider.types';

export const fluentProviderClassName = 'fui-FluentProvider';

const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
  },
});

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(fluentProviderClassName, state.themeClassName, styles.root, state.root.className);

  return state;
};
