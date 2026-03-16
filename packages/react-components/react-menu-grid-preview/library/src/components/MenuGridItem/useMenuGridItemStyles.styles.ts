'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuGridItemSlots, MenuGridItemState } from './MenuGridItem.types';

export const menuGridItemClassNames: SlotClassNames<MenuGridItemSlots> = {
  root: 'fui-MenuGridItem',
  icon: 'fui-MenuGridItem__icon',
  content: 'fui-MenuGridItem__content',
  subText: 'fui-MenuGridItem__subText',
  firstSubAction: 'fui-MenuGridItem__firstSubAction',
  secondSubAction: 'fui-MenuGridItem__secondSubAction',
};

const useStyles = makeStyles({
  content: {
    flexGrow: 1,
    height: '100%', // ensures content stay centered vertically when menu item's height is overridden
    minWidth: 0,
  },
  icon: {
    height: '100%',
  },
  firstSubAction: {
    height: '100%',
  },
  secondSubAction: {
    height: '100%',
  },
});

export const useMenuGridItemStyles_unstable = (state: MenuGridItemState): MenuGridItemState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(menuGridItemClassNames.root, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(menuGridItemClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.content) {
    state.content.className = mergeClasses(menuGridItemClassNames.content, styles.content, state.content.className);
  }

  if (state.subText) {
    state.subText.className = mergeClasses(menuGridItemClassNames.subText, state.subText.className);
  }

  if (state.firstSubAction) {
    state.firstSubAction.className = mergeClasses(
      menuGridItemClassNames.firstSubAction,
      styles.firstSubAction,
      state.firstSubAction.className,
    );
  }
  if (state.secondSubAction) {
    state.secondSubAction.className = mergeClasses(
      menuGridItemClassNames.secondSubAction,
      styles.secondSubAction,
      state.secondSubAction.className,
    );
  }

  return state;
};
