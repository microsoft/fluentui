import * as React from 'react';
import { SelectionHookParams, SelectionMode } from '@fluentui/react-utilities';
import { TabsterDOMAttribute } from '@fluentui/react-tabster';
import type { TableContextValues, TableProps, TableSlots, TableState } from '../Table/Table.types';
import type {
  SortState,
  TableFeaturesState,
  UseTableSortOptions,
  OnSelectionChangeData,
  TableColumnSizingOptions,
  TableColumnId,
} from '../../hooks';
import { TableRowProps } from '../TableRow/TableRow.types';

export type DataGridSlots = TableSlots;

export type DataGridFocusMode = 'none' | 'cell' | 'row_unstable' | 'composite';

export type DataGridContextValues = TableContextValues & {
  dataGrid: DataGridContextValue;
};

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataGridContextValue = TableFeaturesState<any> & {
  /**
   * How focus navigation will work in the datagrid
   * @default cell
   */
  focusMode: DataGridFocusMode;

  /**
   * Lets child components know if rows selection is enabled
   * @see selectionMode prop enables row selection on the component
   */
  selectableRows: boolean;

  /**
   * Enables subtle selection style
   * @default false
   */
  subtleSelection: boolean;

  /**
   * Row appearance when selected
   * @default brand
   */
  selectionAppearance: TableRowProps['appearance'];

  /**
   * Enables column resizing
   */
  resizableColumns?: boolean;

  compositeRowTabsterAttribute: TabsterDOMAttribute;
};

/**
 * DataGrid Props
 */
export type DataGridProps = TableProps &
  Pick<DataGridContextValue, 'items' | 'columns' | 'getRowId'> &
  Pick<Partial<DataGridContextValue>, 'focusMode' | 'subtleSelection' | 'selectionAppearance' | 'resizableColumns'> &
  Pick<UseTableSortOptions, 'sortState' | 'defaultSortState'> &
  Pick<SelectionHookParams, 'defaultSelectedItems' | 'selectedItems'> & {
    /* eslint-disable @nx/workspace-consistent-callback-type -- can't change type of existing callback */
    onSortChange?: (e: React.MouseEvent, sortState: SortState) => void;
    onSelectionChange?: (e: React.MouseEvent | React.KeyboardEvent, data: OnSelectionChangeData) => void;
    /* eslint-enable @nx/workspace-consistent-callback-type */

    /**
     * Enables row selection and sets the selection mode
     * @default false
     */
    selectionMode?: SelectionMode;
    /**
     * Options for column resizing, specific for each column
     */
    columnSizingOptions?: TableColumnSizingOptions;
    /**
     * A callback triggered when a column is resized.
     */
    // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
    onColumnResize?: (
      e: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      data: { columnId: TableColumnId; width: number },
    ) => void;
    /**
     * For column resizing. Allows for a container size to be adjusted by a number of pixels, to make
     * sure the columns don't overflow the table.
     * By default, this value is calculated internally based on other props, but can be overriden.
     */
    containerWidthOffset?: number;

    /**
     * Custom options for column resizing.
     */
    resizableColumnsOptions?: {
      /**
       * If true, columns will be auto-fitted to the container width.
       * @default true
       * */
      autoFitColumns?: boolean;
    };
  };

/**
 * State used in rendering DataGrid
 */
export type DataGridState = TableState & { tableState: TableFeaturesState<unknown> } & Pick<
    DataGridContextValue,
    | 'focusMode'
    | 'selectableRows'
    | 'subtleSelection'
    | 'selectionAppearance'
    | 'getRowId'
    | 'resizableColumns'
    | 'compositeRowTabsterAttribute'
  >;
