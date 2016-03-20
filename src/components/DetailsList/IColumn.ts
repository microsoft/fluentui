import * as React from 'react';

interface IColumn {
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
  onColumnClick?: (column: IColumn, ev: React.MouseEvent) => any;
}

export default IColumn;

