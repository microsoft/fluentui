'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuGridGroupHeaderSlots, MenuGridGroupHeaderState } from './MenuGridGroupHeader.types';
import { tokens } from '@fluentui/react-theme';

export const menuGridGroupHeaderClassNames: SlotClassNames<MenuGridGroupHeaderSlots> = {
  root: 'fui-MenuGridGroupHeader',
};

const useStyles = makeStyles({
  root: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    paddingLeft: '8px',
    paddingRight: '8px',
    fontWeight: tokens.fontWeightSemibold,
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  },
});

export const useMenuGridGroupHeaderStyles_unstable = (state: MenuGridGroupHeaderState): MenuGridGroupHeaderState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(menuGridGroupHeaderClassNames.root, styles.root, state.root.className);

  return state;
};
