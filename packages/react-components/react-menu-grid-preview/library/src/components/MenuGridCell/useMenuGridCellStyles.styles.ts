import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';

export const menuGridCellClassNames: SlotClassNames<MenuGridCellSlots> = {
  root: 'fui-MenuGridCell',
};

const useRootStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    minHeight: '24px', // To match small button size
    display: 'flex',
    alignItems: 'center',
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
