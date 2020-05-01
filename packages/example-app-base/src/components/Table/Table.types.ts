import * as React from 'react';

export interface ITableProps {
  className?: string;

  columns: ITableColumnProps[];

  rows: ITableRowProps[];

  formatter: (column: ITableColumnProps, row: ITableRowProps) => React.ReactNode | void;
}

export interface ITableColumnProps {
  title: string;

  data?: number | string;

  percentWidth?: number;

  minWidth?: number | string;

  maxWidth?: number | string;

  rowProperty?: number | string;

  overflow?: 'auto' | 'hidden' | 'scroll' | 'visible';

  overflowX?: 'auto' | 'hidden' | 'scroll' | 'visible';

  overflowY?: 'auto' | 'hidden' | 'scroll' | 'visible';
}

export interface ITableRowProps {
  // tslint:disable-next-line no-any
  [key: string]: any;
}

export interface ITableRowProps {}
