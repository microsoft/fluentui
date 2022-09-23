import { mergeClasses, makeStyles } from '@griffel/react';
import type { TableBodySlots, TableBodyState } from './TableBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

const useNativeLayoutStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'block',
  },
});

export const tableBodyClassName = 'fui-TableBody';
export const tableBodyClassNames: SlotClassNames<TableBodySlots> = {
  root: 'fui-TableBody',
};

/**
 * Apply styling to the TableBody slots based on the state
 */
export const useTableBodyStyles_unstable = (state: TableBodyState): TableBodyState => {
  const layoutStyles = {
    native: useNativeLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(tableBodyClassName, layoutStyles[state.layoutType].root, state.root.className);

  return state;
};
