import * as React from 'react';
import { IItem } from './List';
import { IColumn, ISizing } from './DataList';
import { DataListRow } from './DataListRow';
import * as stylesImport from './DataListHeader.scss';
const styles: any = stylesImport;

export interface IDataListHeaderProps {
  columns: IColumn[];

  itemHeight: number;

  onColumnResize?: (column: IColumn, newWidth: number) => void;
}

export class DataListHeader extends React.PureComponent<IDataListHeaderProps> {
  private headerItem: { [columnName: string]: string };

  constructor(props: IDataListHeaderProps, context: any) {
    super(props, context);

    const { columns } = this.props;

    this.headerItem = {};
    for (const column of columns) {
      this.headerItem[column.fieldName || column.key] = column.name;
    }
  }

  public render() {
    const { columns, itemHeight } = this.props;

    return <DataListRow className={ styles.header } columns={ columns } index={ -1 } item={ this.headerItem } itemHeight={ itemHeight } />;
  }
}