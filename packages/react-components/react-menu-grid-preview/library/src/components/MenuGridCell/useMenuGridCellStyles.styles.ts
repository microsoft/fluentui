import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';

export const menuGridCellClassNames: SlotClassNames<MenuGridCellSlots> = {
  root: 'fui-MenuGridCell',
};

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
  },
});

export const useMenuGridCellStyles_unstable = (state: MenuGridCellState): MenuGridCellState => {
  'use no memo';

  const classes = useStyles();

  state.root.className = mergeClasses(menuGridCellClassNames.root, classes.root, state.root.className);

  return state;
};
