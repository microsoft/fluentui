import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses, makeStyles } from '@griffel/react';
import type { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';

export const menuGridCellClassNames: SlotClassNames<MenuGridCellSlots> = {
  root: 'fui-MenuGridCell',
};

const useRootStyles = makeStyles({
  visuallyHidden: {
    position: 'absolute',
  },
});

export const useMenuGridCellStyles_unstable = (state: MenuGridCellState): MenuGridCellState => {
  'use no memo';

  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    menuGridCellClassNames.root,
    state.visuallyHidden && rootStyles.visuallyHidden,
    state.root.className,
  );

  return state;
};
