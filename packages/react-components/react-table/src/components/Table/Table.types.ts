import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type TableSlots = {
  root: Slot<'table', 'div'>;
};

export type TableContextValue = {
  size: 'small' | 'smaller' | 'medium';

  noNativeElements: boolean;

  sortable: boolean;
};

export type SortDirection = 'ascending' | 'descending';
export type SortState = {
  sortColumn: string | undefined;
  sortDirection: 'ascending' | 'descending';
};

export type TableContextValues = {
  table: TableContextValue;
};

/**
 * Table Props
 */
export type TableProps = ComponentProps<TableSlots> & {} & Partial<TableContextValue> & {
    /**
     * Called when the sorted column changes
     */
    onSortColumnChange?: (
      e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      data: { sortState: SortState },
    ) => void;

    sortState?: SortState;

    defaultSortState?: SortState;
  };

/**
 * State used in rendering Table
 */
export type TableState = ComponentState<TableSlots> &
  Pick<Required<TableProps>, 'size' | 'noNativeElements'> &
  TableContextValue;
