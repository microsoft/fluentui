import * as React from 'react';
import { getNativeElementProps, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { SortDirection, TableContextValue, TableProps, TableState } from './Table.types';

/**
 * Create the state required to render Table.
 *
 * The returned state can be modified with hooks such as useTableStyles_unstable,
 * before being passed to renderTable_unstable.
 *
 * @param props - props from this instance of Table
 * @param ref - reference to root HTMLElement of Table
 */
export const useTable_unstable = (props: TableProps, ref: React.Ref<HTMLElement>): TableState => {
  const rootComponent = props.as ?? props.noNativeElements ? 'div' : 'table';
  const sortable =
    !!props.onSortColumnChange ||
    !!props.sortColumn ||
    !!props.sortDirection ||
    !!props.sortState ||
    !!props.defaultSortState;

  const [sortState, setSortState] = useControllableState<NonNullable<TableProps['sortState']>>({
    initialState: {
      sortColumn: undefined,
      sortDirection: 'ascending',
    },
    defaultState: props.defaultSortState,
    state: props.sortState,
  });

  const requestSortColumnChange: TableContextValue['requestSortColumnChange'] = useEventCallback((e, columnKey) => {
    const newState = {
      sortColumn: columnKey,
      sortDirection: 'ascending' as SortDirection,
    };
    setSortState(s => {
      if (s.sortColumn === columnKey) {
        newState.sortDirection = s.sortDirection === 'ascending' ? 'descending' : 'ascending';
      }

      props.onSortColumnChange?.(e, { sortState: newState });
      return newState;
    });
  });

  return {
    components: {
      root: rootComponent,
    },
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'table' : undefined,
      ...props,
    }),
    size: props.size ?? 'medium',
    noNativeElements: props.noNativeElements ?? false,
    sortable,
    requestSortColumnChange,
    ...sortState,
  };
};
