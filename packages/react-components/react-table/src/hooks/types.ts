import { SortDirection } from '../components/Table/Table.types';

export type RowId = string | number;
export type ColumnId = string | number;
export type SelectionMode = 'single' | 'multiselect';

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

export interface TableSortState<TItem> {
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

  /**
   * Sorts rows and returns a **shallow** copy of original items
   */
  sort: <TRowState extends RowState<TItem>>(rows: TRowState[]) => TRowState[];
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
  selectedRows: Set<RowId>;
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

export interface TableState<TItem> extends Pick<UseTableOptions<TItem>, 'items' | 'getRowId'> {
  /**
   * The row data for rendering
   * @param rowEnhancer - Enhances the row with extra user data
   */
  getRows: <TRowState extends RowState<TItem> = RowState<TItem>>(
    rowEnhancer?: RowEnhancer<TItem, TRowState>,
  ) => TRowState[];
  /**
   * State and actions to manage row selection
   */
  selection: TableSelectionState;
  /**
   * State and actions to manage row sorting
   */
  sort: TableSortState<TItem>;
  /**
   * Table columns
   */
  columns: ColumnDefinition<TItem>[];
}

export interface UseSortOptions {
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
  onSortChange?: (state: SortState) => void;
}

export interface UseSelectionOptions {
  /**
   * Can be multi or single select
   */
  selectionMode: SelectionMode;
  /**
   * Used in uncontrolled mode to set initial selected rows on mount
   */
  defaultSelectedItems?: Set<RowId>;
  /**
   * Used to control row selection
   */
  selectedItems?: Set<RowId>;
  /**
   * Called when selection changes
   */
  onSelectionChange?: (selectedItems: Set<RowId>) => void;
}

export interface UseTableOptions<TItem> {
  columns: ColumnDefinition<TItem>[];
  items: TItem[];
  getRowId?: (item: TItem) => RowId;
}

export type TableStatePlugin = <TItem>(tableState: TableState<TItem>) => TableState<TItem>;
