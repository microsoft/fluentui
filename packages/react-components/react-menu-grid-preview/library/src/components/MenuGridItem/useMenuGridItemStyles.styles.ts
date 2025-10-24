'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuGridItemSlots, MenuGridItemState } from './MenuGridItem.types';

export const menuGridItemClassNames: SlotClassNames<MenuGridItemSlots> = {
  root: 'fui-MenuGridItem',
  icon: 'fui-MenuGridRow__icon',
  content: 'fui-MenuGridRow__content',
  subText: 'fui-MenuGridRow__subText',
  firstSubAction: 'fui-MenuGridRow__firstSubAction',
  secondSubAction: 'fui-MenuGridRow__secondSubAction',
};

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
  },
});

export const useMenuGridItemStyles_unstable = (state: MenuGridItemState): MenuGridItemState => {
  'use no memo';

  const rootStyles = useStyles();

  state.root.className = mergeClasses(menuGridItemClassNames.root, state.root.className);

  if (state.content) {
    state.content.className = mergeClasses(menuGridItemClassNames.content, rootStyles.content, state.content.className);
  }
  return state;
};
