import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type TableSlots = {
  root: Slot<'table', 'div'>;
};

export type TableContextValue = {
  size: 'small' | 'smaller' | 'medium';

  noNativeElements: boolean;

  requestSortColumnChange: (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    columnKey: string,
  ) => void;

  sortColumn: string | undefined;

  sortDirection: SortDirection;

  sortable: boolean;
};

export type SortDirection = 'ascending' | 'descending';

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
      data: { sortColumn: string; sortDirection: SortDirection },
    ) => void;

    sortColumn?: string;

    /**
     * Sets the sort column key on mount when the sort state is uncontrolled
     */
    defaultSortColumn?: string;

    sortDirection?: SortDirection;

    /**
     * Sets the sort direction on mount when the sort state is uncontrolled
     */
    defaultSortDirection?: SortDirection;
  };

/**
 * State used in rendering Table
 */
export type TableState = ComponentState<TableSlots> &
  Pick<Required<TableProps>, 'size' | 'noNativeElements'> &
  Pick<TableContextValue, 'sortable' | 'sortColumn' | 'sortDirection' | 'requestSortColumnChange'>;
