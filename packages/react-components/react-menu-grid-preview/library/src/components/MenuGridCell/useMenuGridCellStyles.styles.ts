'use client';

import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';

export const menuGridCellClassNames: SlotClassNames<MenuGridCellSlots> = {
  root: 'fui-MenuGridCell',
};

const useRootStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',

    boxSizing: 'border-box',
    minHeight: '24px', // To match small button size
  },
  visuallyHidden: {
    position: 'absolute',
  },
});

export const useMenuGridCellStyles_unstable = (state: MenuGridCellState): MenuGridCellState => {
  'use no memo';

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    menuGridCellClassNames.root,
    rootStyles.root,
    state.visuallyHidden && rootStyles.visuallyHidden,
    state.root.className,
  );

  return state;
};
