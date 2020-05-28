import * as React from 'react';
import { IColumn } from './DetailsList.types';
import { BaseComponent, css } from '../../Utilities';
import * as stylesImport from './DetailsRow.scss';
const styles: any = stylesImport;

const INNER_PADDING = 16; // Account for padding around the cell.
const ISPADDED_WIDTH = 24;

export interface IDetailsRowFieldsProps {
  componentRef?: () => void;
  item: any;
  itemIndex: number;
  columnStartIndex: number;
  columns: IColumn[];
  compact?: boolean;
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
  shimmer?: boolean;
}

export interface IDetailsRowFieldsState {
  cellContent: React.ReactNode[];
}

export class DetailsRowFields extends BaseComponent<IDetailsRowFieldsProps, IDetailsRowFieldsState> {
  constructor(props: IDetailsRowFieldsProps) {
    super(props);

    this.state = this._getState(props);
  }

  public componentWillReceiveProps(newProps: IDetailsRowFieldsProps) {
    this.setState(this._getState(newProps));
  }

  public render() {
    const { columns, columnStartIndex, shimmer } = this.props;
    const { cellContent } = this.state;

    return (
      <div
        className={ css('ms-DetailsRow-fields', styles.fields) }
        data-automationid='DetailsRowFields'
        role='presentation'
      >
        { columns.map((column, columnIndex) => (
          <div
            key={ columnIndex }
            role={ column.isRowHeader ? 'rowheader' : 'gridcell' }
            aria-colindex={ columnIndex + columnStartIndex + 1 }
            className={ css('ms-DetailsRow-cell', styles.cell, column.className,
              column.isMultiline && 'is-multiline',
              column.isRowHeader && styles.isRowHeader,
              column.isPadded && styles.isPadded,
              column.isMultiline && styles.isMultiline,
              (column.isIconOnly && shimmer) && styles.shimmerIconPlaceholder,
              shimmer && styles.shimmer
            ) }
            style={ { width: column.calculatedWidth! + INNER_PADDING + (column.isPadded ? ISPADDED_WIDTH : 0) } }
            data-automationid='DetailsRowCell'
            data-automation-key={ column.key }
          >
            { cellContent[columnIndex] }
          </div>
        )) }
      </div>
    );
  }

  private _getState(props: IDetailsRowFieldsProps) {
    const { item, itemIndex, onRenderItemColumn, shimmer } = props;

    return {
      cellContent: props.columns.map((column) => {
        let cellContent;

        try {
          const render = column.onRender || onRenderItemColumn;

          cellContent = render && !shimmer ? render(item, itemIndex, column) : this._getCellText(item, column);
        } catch (e) { /* no-op */ }

        return cellContent;
      })
    };
  }

  private _getCellText(item: any, column: IColumn) {
    let value = (item && column && column.fieldName) ? item[column.fieldName] : '';

    if (value === null || value === undefined) {
      value = '';
    }

    return value;
  }
}
