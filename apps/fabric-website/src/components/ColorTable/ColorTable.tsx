import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as stylesImport from './ColorTable.module.scss';
const styles: any = stylesImport;

export interface IColorTableProps {
  /**
   * Content for the table.
   */
  content: any;
}

export interface IColorTableState {
}

export class ColorTable extends React.Component<IColorTableProps, IColorTableState> {
  public render() {
    let { content } = this.props;

    return (
      <table className={ styles.table }>
        <thead className={ styles.screenReaderOnly }>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { content.map((row, rowIndex) => (
            <tr className={ css(('ms-bgColor-' + row.name), row.labelColorClass) } key={ rowIndex }>
              <td>{ row.name }</td>
              <td>{ row.value }</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}
