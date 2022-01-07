import * as React from 'react';
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { tokens } from '@fluentui/react-theme';
import type { MenuGroupHeaderState } from './MenuGroupHeader.types';

export const menuGroupHeaderClassName = 'fui-MenuGroupHeader';

const useStyles = makeStyles({
  root: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    paddingLeft: '12px',
    paddingRight: '12px',
    fontWeight: tokens.fontWeightSemibold as React.CSSProperties['fontWeight'],
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  },
});

export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuGroupHeaderClassName, styles.root, state.root.className);

  return state;
};
