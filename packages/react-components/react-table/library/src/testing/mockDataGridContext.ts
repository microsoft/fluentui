import * as React from 'react';
import { DataGridContextValue } from '../components/DataGrid/DataGrid.types';
import {
  TableColumnDefinition,
  createTableColumn,
  defaultTableSelectionState,
  defaultTableSortState,
  TableSelectionState,
  TableSortState,
  defaultColumnSizingState,
} from '../hooks';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';

interface Item {
  first: string;
  second: string;
  third: string;
}

const testColumns: TableColumnDefinition<Item>[] = [
  createTableColumn({ columnId: 'first', renderHeaderCell: () => 'first', renderCell: item => item.first }),
  createTableColumn({ columnId: 'second', renderHeaderCell: () => 'second', renderCell: item => item.second }),
  createTableColumn({ columnId: 'third', renderHeaderCell: () => 'third', renderCell: item => item.third }),
];
const testItems: Item[] = [
  { first: 'first', second: 'second', third: 'third' },
  { first: 'first', second: 'second', third: 'third' },
  { first: 'first', second: 'second', third: 'third' },
];

export function mockDataGridContext(
  options: Partial<DataGridContextValue> = {},
  substates: { sort?: Partial<TableSortState<unknown>>; selection?: Partial<TableSelectionState> } = {},
) {
  const mockContext: DataGridContextValue = {
    columns: testColumns,
    items: testItems,
    focusMode: 'none',
    getRowId: undefined,
    getRows: () => [],
    selection: { ...defaultTableSelectionState, ...substates.selection },
    sort: { ...defaultTableSortState, ...substates.sort },
    selectableRows: false,
    subtleSelection: false,
    selectionAppearance: 'brand',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnSizing_unstable: defaultColumnSizingState,
    tableRef: React.createRef(),
    compositeRowTabsterAttribute: {} as TabsterDOMAttribute,
    ...options,
  };

  return mockContext;
}
