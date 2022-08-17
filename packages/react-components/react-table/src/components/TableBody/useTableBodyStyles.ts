import { mergeClasses } from '@griffel/react';
import type { TableBodySlots, TableBodyState } from './TableBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableBodyClassName = 'fui-TableBody';
export const tableBodyClassNames: SlotClassNames<TableBodySlots> = {
  root: 'fui-TableBody',
};

/**
 * Apply styling to the TableBody slots based on the state
 */
export const useTableBodyStyles_unstable = (state: TableBodyState): TableBodyState => {
  state.root.className = mergeClasses(tableBodyClassName, state.root.className);

  return state;
};
