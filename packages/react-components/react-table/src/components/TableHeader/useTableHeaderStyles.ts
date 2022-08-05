import { mergeClasses } from '@griffel/react';
import type { TableHeaderSlots, TableHeaderState } from './TableHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableHeaderClassName = 'fui-TableHeader';
export const tableHeaderClassNames: SlotClassNames<TableHeaderSlots> = {
  root: 'fui-TableHeader',
};

/**
 * Apply styling to the TableHeader slots based on the state
 */
export const useTableHeaderStyles_unstable = (state: TableHeaderState): TableHeaderState => {
  state.root.className = mergeClasses(tableHeaderClassName, state.root.className);

  return state;
};
