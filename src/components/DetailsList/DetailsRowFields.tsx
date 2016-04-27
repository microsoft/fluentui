import * as React from 'react';
import { IColumn } from './index';
import { css } from '../../utilities/css';
import { shallowCompare } from '../../utilities/object';

export interface IDetailsRowFieldsProps {
  item: any;
  itemIndex: number;
  columns: IColumn[];
}

export default class DetailsRowFields extends React.Component<IDetailsRowFieldsProps, {}> {
  public shouldComponentUpdate(newProps: IDetailsRowFieldsProps) {
    return !shallowCompare(this.props, newProps);
  }

  public render() {
      let { columns, itemIndex } = this.props;

      return (
          <div className='ms-DetailsRow-fields' data-automationid='DetailsRowFields'>
        { columns.map((column, columnIndex) => (
            <div key={ columnIndex } className={ css('ms-DetailsRow-cell', column.className, {
                'is-multiline': column.isMultiline
            }) } style={ { width: column.calculatedWidth } }
                data-automationid='DetailsRowCell'
                data-automation-key={ column.key }>
            { this._getCellContent(column, itemIndex) }
                </div>
        )) }
              </div>
      );
  }

  private _getCellContent(column: IColumn, index: number): any {
    let { item } = this.props;
    let cellContent;

    try {
      cellContent = column.onRender ? column.onRender(item, index) : (String(item[column.fieldName] || ''));
    } catch (e) {
      cellContent = `{ Exception: ${e.message}}`;
    }

    return cellContent;
  }

}
