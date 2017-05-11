import * as React from 'react';
import { IColumn } from './DetailsList.Props';
import { BaseComponent, css } from '../../Utilities';
import * as stylesImport from './DetailsRow.scss';
const styles: any = stylesImport;

export interface IDetailsRowFieldsProps {
  item: any;
  itemIndex: number;
  columns: IColumn[];
  compact?: boolean;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
}

export interface IDetailsRowFieldsState {
  cellContent: React.ReactNode[];
}

export class DetailsRowFields extends BaseComponent<IDetailsRowFieldsProps, IDetailsRowFieldsState> {
  constructor(props: IDetailsRowFieldsProps) {
    super();

    this.state = this._getState(props);
  }

  public componentWillReceiveProps(newProps: IDetailsRowFieldsProps) {
    this.setState(this._getState(newProps));
  }

  public render() {
    let { columns, compact } = this.props;
    let { cellContent } = this.state;

    return (
      <div className={ css('ms-DetailsRow-fields', styles.fields) } data-automationid='DetailsRowFields'>
        { columns.map((column, columnIndex) => (
          <div
            key={ columnIndex }
            role={ column.isRowHeader ? 'rowheader' : 'gridcell' }
            aria-colindex={ columnIndex }
            className={ css('ms-DetailsRow-cell', styles.cell, column.className, {
              'is-multiline': column.isMultiline,
              [styles.isRowHeader]: column.isRowHeader,
              [styles.isPadded]: column.isPadded,
              [styles.isMultiline]: column.isMultiline,
              [styles.compact]: compact
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
