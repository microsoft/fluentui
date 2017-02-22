import * as React from 'react';
import { IColumn } from './DetailsList.Props';
import { css } from '../../Utilities';

export interface IDetailsRowFieldsProps {
  item: any;
  itemIndex: number;
  columns: IColumn[];
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
}

export interface IDetailsRowFieldsState {
  cellContent: React.ReactNode[];
}

export class DetailsRowFields extends React.Component<IDetailsRowFieldsProps, IDetailsRowFieldsState> {
  constructor(props: IDetailsRowFieldsProps) {
    super();

    this.state = this._getState(props);
  }

  public componentWillReceiveProps(newProps: IDetailsRowFieldsProps) {
    this.setState(this._getState(newProps));
  }

  public render() {
    let { columns } = this.props;
    let { cellContent } = this.state;

    return (
      <div className='ms-DetailsRow-fields' data-automationid='DetailsRowFields'>
        { columns.map((column, columnIndex) => (
          <div
            key={ columnIndex }
            role={ column.isRowHeader ? 'rowheader' : 'gridcell' }
            className={ css('ms-DetailsRow-cell', column.className, {
              'is-multiline': column.isMultiline
            }) }
            style={ { width: column.calculatedWidth } }
            data-automationid='DetailsRowCell'
            data-automation-key={ column.key }>
            { cellContent[columnIndex] }
          </div>
        )) }
      </div>
    );
  }

  private _getState(props: IDetailsRowFieldsProps) {
    let { item, itemIndex, onRenderItemColumn } = props;

    return {
      cellContent: props.columns.map((column) => {
        let cellContent;

        try {
          let render = column.onRender || onRenderItemColumn;

          cellContent = render ? render(item, itemIndex, column) : this._getCellText(item, column);
        } catch (e) { /* no-op */ }

        return cellContent;
      })
    };
  }

  private _getCellText(item, column) {
    let value = (item && column && column.fieldName) ? item[column.fieldName] : '';

    if (value === null || value === undefined) {
      value = '';
    }

    return value;
  }

}
