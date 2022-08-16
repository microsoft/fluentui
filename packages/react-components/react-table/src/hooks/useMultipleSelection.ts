import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import type { SelectionStateInternal, RowId, GetRowIdInternal } from './types';

export function useMultipleSelection<TItem>(items: TItem[], getRowId: GetRowIdInternal<TItem>): SelectionStateInternal {
  const [selected, setSelected] = React.useState(new Set<RowId>());
  const allRowIds = React.useMemo(() => new Set<RowId>(items.map((item, i) => getRowId(item, i))), [items, getRowId]);

  const toggleSelectAllRows: SelectionStateInternal['toggleSelectAllRows'] = useEventCallback(() => {
    setSelected(s => {
      if (s.size === items.length) {
        return new Set<RowId>();
      }

      return new Set<RowId>(items.map((item, i) => getRowId(item, i)));
    });
  });

  const toggleRowSelect: SelectionStateInternal['toggleRowSelect'] = React.useCallback(
    (rowId: RowId) => {
      if (!allRowIds.has(rowId)) {
        return;
      }

      setSelected(s => {
        const newState = new Set(s);
        if (newState.has(rowId)) {
          newState.delete(rowId);
        } else {
          newState.add(rowId);
        }

        return newState;
      });
    },
    [allRowIds],
  );

  const selectRow: SelectionStateInternal['selectRow'] = React.useCallback(
    (rowId: RowId) => {
      if (!allRowIds.has(rowId)) {
        return;
      }
      setSelected(s => {
        const newState = new Set(s);
        newState.add(rowId);
        return newState;
      });
    },
    [allRowIds],
  );

  const deSelectRow: SelectionStateInternal['selectRow'] = React.useCallback((rowId: RowId) => {
    setSelected(s => {
      const newState = new Set(s);
      newState.delete(rowId);
      return newState;
    });
  }, []);

  const clearSelection: SelectionStateInternal['clearSelection'] = React.useCallback(() => {
    setSelected(new Set<RowId>());
  }, []);

  const isRowSelected: SelectionStateInternal['isRowSelected'] = React.useCallback(
    (rowId: RowId) => {
      return selected.has(rowId);
    },
    [selected],
  );

  return {
    isRowSelected,
    clearSelection,
    deSelectRow,
    selectRow,
    toggleRowSelect,
    toggleSelectAllRows,
    selectedRows: selected,
    allRowsSelected: selected.size === items.length,
    someRowsSelected: selected.size > 0,
  };
}
