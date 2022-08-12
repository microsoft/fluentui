import { SortDirection } from '../components/Table/Table.types';
import { TableHeaderCellProps } from '../components/TableHeaderCell/TableHeaderCell.types';

export type RowId = string | number;
export type ColumnId = string | number;
export type GetRowIdInternal<TItem> = (rowId: TItem, index: number) => RowId;

export interface ColumnDefinition<TItem> {
  columnId: ColumnId;
  compare?: (a: TItem, b: TItem) => number;
}

export interface SortStateInternal<TItem> {
  sortDirection: SortDirection;
  sortColumn: ColumnId | undefined;
  setColumnSort: (columnId: ColumnId, sortDirection: SortDirection) => void;
  toggleColumnSort: (columnId: ColumnId) => void;
  headerSortProps: (columnId: ColumnId) => TableHeaderCellProps;
  /**
   * Returns a sorted **shallow** copy of original items
   */
  sort: (items: TItem[]) => TItem[];
}

export interface UseTableOptions<TItem> {
  columns: ColumnDefinition<TItem>[];
  items: TItem[];
  selectionMode?: 'single' | 'multiselect';
  getRowId?: (item: TItem) => RowId;
}

export interface SelectionStateInternal {
  clearSelection: () => void;
  deSelectRow: (rowId: RowId) => void;
  selectRow: (rowId: RowId) => void;
  toggleSelectAllRows: () => void;
  toggleRowSelect: (rowId: RowId) => void;
  selectedRows: Set<RowId>;
  allRowsSelected: boolean;
  someRowsSelected: boolean;
}

export interface SortState {
  /**
   * Current sort direction
   */
  sortDirection: SortDirection;
  /**
   * Column id of the currently sorted column
   */
  sortColumn: ColumnId | undefined;
  /**
   * Set the sort direction for the specified column
   */
  setColumnSort: (columnId: ColumnId, sortDirection: SortDirection) => void;
  /**
   * Toggles the sort direction for specified column
   */
  toggleColumnSort: (columnId: ColumnId) => void;
  /**
   * Returns props for @see TableHeaderCell to display sort state correctly
   */
  headerSortProps: (columnId: ColumnId) => TableHeaderCellProps;
}

export interface SelectionState {
  /**
   * Clears all selected rows
   */
  clearSelection: () => void;
  /**
   * Selects single row
   */
  selectRow: (rowId: RowId) => void;
  /**
   * De-selects single row
   */
  deSelectRow: (rowId: RowId) => void;
  /**
   * Toggle selection of all rows
   */
  toggleSelectAllRows: () => void;
  /**
   * Toggle selection of single row
   */
  toggleRowSelect: (rowId: RowId) => void;
  /**
   * Collection of row ids corresponding to selected rows
   */
  selectedRows: RowId[];
  /**
   * Whether all rows are selected
   */
  allRowsSelected: boolean;
  /**
   * Whether some rows are selected
   */
  someRowsSelected: boolean;
}

export interface RowState<TItem> {
  /**
   * User provided data
   */
  item: TItem;
  /**
   * Toggle the selection of the row
   */
  toggleSelect: () => void;
  /**
   * Selects the row
   */
  selectRow: () => void;
  /**
   * De-selects the row
   */
  deSelectRow: () => void;
  /**
   * Whether the row is selected
   */
  selected: boolean;
  /**
   * The row id, defaults to index position in the collection
   */
  rowId: RowId;
}

export interface TableState<TItem> {
  /**
   * The row data for rendering
   */
  rows: RowState<TItem>[];
  /**
   * State and actions to manage row selection
   */
  selection: SelectionState;
  /**
   * State and actions to manage row sorting
   */
  sort: SortState;
}
