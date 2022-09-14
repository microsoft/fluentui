import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableSlots = {
  root: Slot<'table', 'div'>;
};

export type TableContextValue = {
  size: 'small' | 'smaller' | 'medium';

  noNativeElements: boolean;

  sortable: boolean;
};

export type SortDirection = 'ascending' | 'descending';

export type TableContextValues = {
  table: TableContextValue;
};

/**
 * Table Props
 */
export type TableProps = ComponentProps<TableSlots> & Partial<TableContextValue>;

/**
 * State used in rendering Table
 */
export type TableState = ComponentState<TableSlots> &
  Pick<Required<TableProps>, 'size' | 'noNativeElements'> &
  TableContextValue;
