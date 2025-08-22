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

const useStyles  = makeStyles({
  secondSubAction: {
    marginLeft: 'auto',
  }
});

export const useMenuGridItemStyles_unstable = (state: MenuGridItemState): MenuGridItemState => {
  'use no memo';

  const classes = useStyles();

  state.root.className = mergeClasses(menuGridItemClassNames.root, state.root.className);
  if (state.secondSubAction) {
    state.secondSubAction.className = mergeClasses(
      menuGridItemClassNames.secondSubAction,
      classes.secondSubAction,
      state.secondSubAction.className,
    );
  }
  return state;
};
