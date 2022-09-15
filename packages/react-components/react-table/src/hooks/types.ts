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
  state: { selection: TableSelectionState; sort: TableSortState },
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
  sort: (items: TItem[]) => TItem[];
}

export interface UseTableOptions<TItem, TRowState extends RowState<TItem> = RowState<TItem>> {
  columns: ColumnDefinition<TItem>[];
  items: TItem[];
  selectionMode?: SelectionMode;
  /**
   * Used in uncontrolled mode to set initial selected rows on mount
   */
  defaultSelectedRows?: Set<RowId>;
  /**
   * Used to control row selection
   */
  selectedRows?: Set<RowId>;
  /**
   * Called when selection changes
   */
  onSelectionChange?: OnSelectionChangeCallback;
  /**
   * Used to control sorting
   */
  sortState?: SortState;
  /**
   * Used in uncontrolled mode to set initial sort column and direction on mount
   */
  defaultSortState?: SortState;
  /**
   * Called when sort changes
   */
  onSortChange?: OnSortChangeCallback;
  getRowId?: (item: TItem) => RowId;
  rowEnhancer?: RowEnhancer<TItem, TRowState>;
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

export interface TableSortState {
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

export interface TableState<TItem, TRowState extends RowState<TItem> = RowState<TItem>> {
  /**
   * The row data for rendering
   */
  rows: TRowState[];
  /**
   * State and actions to manage row selection
   */
  selection: TableSelectionState;
  /**
   * State and actions to manage row sorting
   */
  sort: TableSortState;
}
