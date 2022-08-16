import { SortDirection } from '../components/Table/Table.types';

export type RowId = string | number;
export type ColumnId = string | number;
export type GetRowIdInternal<TItem> = (rowId: TItem, index: number) => RowId;

export interface ColumnDefinition<TItem> {
  columnId: ColumnId;
  compare?: (a: TItem, b: TItem) => number;
}

export type RowEnhancer<TItem, TRowState extends RowState<TItem> = RowState<TItem>> = (
  row: RowState<TItem>,
  state: { selection: SelectionState; sort: SortState },
) => TRowState;

export interface SortStateInternal<TItem> {
  sortDirection: SortDirection;
  sortColumn: ColumnId | undefined;
  setColumnSort: (columnId: ColumnId, sortDirection: SortDirection) => void;
  toggleColumnSort: (columnId: ColumnId) => void;
  getSortDirection: (columnId: ColumnId) => SortDirection | undefined;
  /**
   * Returns a sorted **shallow** copy of original items
   */
  sort: (items: TItem[]) => TItem[];
}

export interface UseTableOptions<TItem, TRowState extends RowState<TItem> = RowState<TItem>> {
  columns: ColumnDefinition<TItem>[];
  items: TItem[];
  selectionMode?: 'single' | 'multiselect';
  getRowId?: (item: TItem) => RowId;
  rowEnhancer?: RowEnhancer<TItem, TRowState>;
}

export interface SelectionStateInternal {
  clearSelection: () => void;
  deSelectRow: (rowId: RowId) => void;
  selectRow: (rowId: RowId) => void;
  toggleSelectAllRows: () => void;
  toggleRowSelect: (rowId: RowId) => void;
  isRowSelected: (rowId: RowId) => boolean;
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
   * Returns the sort direction if a column is sorted,
   * returns undefined if the column is not sorted
   */
  getSortDirection: (columnId: ColumnId) => SortDirection | undefined;
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

  /**
   * Checks if a given rowId is selected
   */
  isRowSelected: (rowId: RowId) => boolean;
}

export interface RowState<TItem> {
  /**
   * User provided data
   */
  item: TItem;
  /**
   * The row id, defaults to index position in the collection
   */
  rowId: RowId;
}

export interface TableState<TItem, TRowState extends RowState<TItem> = RowState<TItem>> {
  /**
   * The row data for rendering
   */
  rows: TRowState[];
  /**
   * State and actions to manage row selection
   */
  selection: SelectionState;
  /**
   * State and actions to manage row sorting
   */
  sort: SortState;
}
