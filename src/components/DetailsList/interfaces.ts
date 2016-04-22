import * as React from 'react';

export interface IColumn {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  maxWidth?: number;
  columnActionsMode?: ColumnActionsMode; /** if undefined, then behavior defaults to ColumnActionsMode.clickable */
  iconClassName?: string; /** CSS class name of an icon to show in addition to the text */
  isCollapsable?: boolean;
  isSortable?: boolean;
  isSorted?: boolean;
  isResizable?: boolean;
  isSortedDescending?: boolean;
  isMultiline?: boolean;
  getCellContent?: (item: any, index?: number) => any;
  calculatedWidth?: number;
  isFilterable?: boolean;
  isFiltered?: boolean;
  onColumnClick?: (column: IColumn, ev: React.MouseEvent) => any;
  // Internal state when a column is resizing.
  isSizing?: boolean;
  isGroupable?: boolean;
  isGrouped?: boolean;
  // Arbitrary data required to be preserved by the caller.
  data?: any;
}

/**
 * Enum to describe how a particular column header behaves.... This enum is used to
 * to specify the property IColumn:columnActionsMode.
 * If IColumn:columnActionsMode is undefined, then it's equivalent to ColumnActionsMode.clickable
 */
export enum ColumnActionsMode {
  disabled, /** disable the column header */
  clickable, /** column header is clickable */
  hasDropdown /** column header is clickable and displays the dropdown cheveron */
}

export enum ConstrainMode {
  unconstrained = 0,
  horizontalConstrained
}

export enum DetailsListLayoutMode {
  fixedColumns,
  justified
}

export interface IGroup {
  key: string;
  name: string;
  startIndex: number;
  count: number;
  isSelected?: boolean;
  isCollapsed?: boolean;
  isShowingAll?: boolean;
  isDropEnabled?: boolean;
  // Arbitrary data required to be preserved by the caller.
  data?: any;
}
