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

  // Internal state when a column is resizing.
  isSizing?: boolean;
}

export default IColumn;

