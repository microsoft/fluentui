import { mergeClasses, makeStyles } from '@griffel/react';
import type { TableHeaderSlots, TableHeaderState } from './TableHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableHeaderClassName = 'fui-TableHeader';
export const tableHeaderClassNames: SlotClassNames<TableHeaderSlots> = {
  root: 'fui-TableHeader',
};

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'block',
  },

  rootNative: {
    display: 'table-row-group',
  },

  rootFlex: {
    display: 'block',
  },
});

const useNativeLayoutStyles = makeStyles({
  root: {
    display: 'table-row-group',
  },
});

/**
 * Apply styling to the TableHeader slots based on the state
 */
export const useTableHeaderStyles_unstable = (state: TableHeaderState): TableHeaderState => {
  const layoutStyles = {
    native: useNativeLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(tableHeaderClassName, layoutStyles[state.layoutType].root, state.root.className);

  return state;
};
