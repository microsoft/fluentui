import { DataGridContextValue } from '../components/DataGrid/DataGrid.types';
import {
  TableColumnDefinition,
  createTableColumn,
  defaultTableSelectionState,
  defaultTableSortState,
  TableSelectionState,
  TableSortState,
} from '../hooks';

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
    ...options,
  };

  return mockContext;
}
