import { SortDirection } from '../components/Table/Table.types';

export type RowId = string | number;
export type ColumnId = string | number;
export type GetRowIdInternal<TItem> = (rowId: TItem, index: number) => RowId;
export type SelectionMode = 'single' | 'multiselect';
export type OnSelectionChangeCallback = (selectedItems: Set<RowId>) => void;
export type OnSortChangeCallback = (state: { sortColumn: ColumnId | undefined; sortDirection: SortDirection }) => void;

export interface SortState {
  sortColumn: ColumnId | undefined;
  sortDirection: SortDirection;
}

export interface ColumnDefinition<TItem> {
  columnId: ColumnId;
  compare?: (a: TItem, b: TItem) => number;
}

export type RowEnhancer<TItem, TRowState extends RowState<TItem> = RowState<TItem>> = (
  row: RowState<TItem>,
) => TRowState;

export interface TableSortStateInternal<TItem> {
  sortDirection: SortDirection;
  sortColumn: ColumnId | undefined;
  setColumnSort: (columnId: ColumnId, sortDirection: SortDirection) => void;
  toggleColumnSort: (columnId: ColumnId) => void;
  getSortDirection: (columnId: ColumnId) => SortDirection | undefined;
  /**
   * Returns a sorted **shallow** copy of original items
   */
  sort: (rows: RowState<TItem>[]) => RowState<TItem>[];
}

export interface UseTableOptions<TItem> {
  selection?: TableSelectionStateInternal;
  sort?: TableSortStateInternal<TItem>;
  columns: ColumnDefinition<TItem>[];
  items: TItem[];
  getRowId?: (item: TItem) => RowId;
}

export interface TableSelectionStateInternal {
  clearRows: () => void;
  deselectRow: (rowId: RowId) => void;
  selectRow: (rowId: RowId) => void;
  toggleAllRows: () => void;
  toggleRow: (rowId: RowId) => void;
  isRowSelected: (rowId: RowId) => boolean;
  selectedRows: Set<RowId>;
  allRowsSelected: boolean;
  someRowsSelected: boolean;
}

export interface TableSortState<TItem> {
  /**
   * @returns sorted rows
   */
  sort: (rows: RowState<TItem>[]) => RowState<TItem>[];
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

export interface TableSelectionState {
  /**
   * Clears all selected rows
   */
  clearRows: () => void;
  /**
   * Selects single row
   */
  selectRow: (rowId: RowId) => void;
  /**
   * De-selects single row
   */
  deselectRow: (rowId: RowId) => void;
  /**
   * Toggle selection of all rows
   */
  toggleAllRows: () => void;
  /**
   * Toggle selection of single row
   */
  toggleRow: (rowId: RowId) => void;
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

export interface TablePaginationState<TItem> {
  getPageRows: (rows: RowState<TItem>[]) => RowState<TItem>[];
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  currentPage: number;
  pageCount: number;
}
export interface TableState<TItem> {
  getRowId?: (item: TItem) => RowId;
  /**
   * Original user items
   */
  items: TItem[];
  /**
   * The row data for rendering
   */
  getRows: <TRowState extends RowState<TItem> = RowState<TItem>>(
    rowEnhancer?: RowEnhancer<TItem, TRowState>,
  ) => TRowState[];
  /**
   * Table columns
   */
  columns: ColumnDefinition<TItem>[];
  /**
   * State and actions to manage row selection
   */
  selection: TableSelectionState;
  /**
   * State and actions to manage row sorting
   */
  sort: TableSortState<TItem>;
  pagination: TablePaginationState<TItem>;
}
