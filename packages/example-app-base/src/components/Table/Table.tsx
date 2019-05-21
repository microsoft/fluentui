import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { ITableProps, ITableColumnProps, ITableRowProps } from './Table.types';
import * as styles from './Table.module.scss';

export class Table extends React.Component<ITableProps> {
  public render(): JSX.Element {
    const { className, columns, rows, formatter } = this.props;

    return (
      <table className={css(styles.table, className)}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {columns.map((column: ITableColumnProps, columnIndex: number) => (
              <th key={columnIndex} className={styles.th} style={this._colStyle(column)}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row: ITableRowProps, rowIndex: number) => (
            <tr key={rowIndex} className={styles.tr}>
              {columns.map((column: ITableColumnProps, columnIndex: number) => {
                const content = (formatter && formatter(column, row)) || (column.rowProperty && row[column.rowProperty]);
                return (
                  <td key={`${rowIndex}-${columnIndex}`} className={styles.td} style={this._colStyle(column)}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  private _colStyle = (column: ITableColumnProps) => {
    const { minWidth, maxWidth, percentWidth, overflow = 'hidden', overflowX, overflowY } = column;
    return {
      width: `${percentWidth}%`,
      minWidth,
      maxWidth,
      overflow,
      overflowX,
      overflowY
    };
  };
}

export default Table;
