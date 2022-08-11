import * as React from 'react';
import type { SelectionStateInternal, RowId } from './types';

export function useSingleSelection(): SelectionStateInternal {
  const [selected, setSelected] = React.useState<RowId | undefined>();
  const toggleRowSelect: SelectionStateInternal['toggleRowSelect'] = React.useCallback(rowId => {
    setSelected(rowId);
  }, []);

  const clearSelection = React.useCallback(() => {
    setSelected(undefined);
  }, []);

  return {
    deSelectRow: clearSelection,
    clearSelection,
    selectRow: toggleRowSelect,
    toggleSelectAllRows: () => undefined,
    toggleRowSelect,
    selectedRows: new Set<RowId>(selected !== undefined ? [selected] : []),
    allRowsSelected: !!selected,
    someRowsSelected: !!selected,
  };
}
