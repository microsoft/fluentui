import * as React from 'react';

export interface IColumn {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  maxWidth?: number;
  isCollapsable?: boolean;
  isSortable?: boolean;
  isSorted?: boolean;
  isResizable?: boolean;
  isSortedDescending?: boolean;
  isClipped?: boolean;
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