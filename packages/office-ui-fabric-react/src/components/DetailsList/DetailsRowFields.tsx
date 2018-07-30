import * as React from 'react';
import { IColumn } from './DetailsList.types';
import { BaseComponent, css } from '../../Utilities';
import { IDetailsRowFieldsProps } from './DetailsRowFields.types';

const INNER_PADDING = 16; // Account for padding around the cell.
const ISPADDED_WIDTH = 24;

export interface IDetailsRowFieldsState {
  cellContent: React.ReactNode[];
}

export class DetailsRowFields extends BaseComponent<IDetailsRowFieldsProps, IDetailsRowFieldsState> {
  constructor(props: IDetailsRowFieldsProps) {
    super(props);

    this.state = this._getState(props);
  }

  public componentWillReceiveProps(newProps: IDetailsRowFieldsProps): void {
    this.setState(this._getState(newProps));
  }

  public render(): JSX.Element {
    const { columns, columnStartIndex, shimmer, rowClassNames } = this.props;
    const { cellContent } = this.state;

    return (
      <div className={rowClassNames.fields} data-automationid="DetailsRowFields" role="presentation">
        {columns.map((column, columnIndex) => {
          const width: string | number =
            typeof column.calculatedWidth === 'undefined'
              ? 'auto'
              : column.calculatedWidth + INNER_PADDING + (column.isPadded ? ISPADDED_WIDTH : 0);

          return (
            <div
              key={columnIndex}
              role={column.isRowHeader ? 'rowheader' : 'gridcell'}
              aria-colindex={columnIndex + columnStartIndex + 1}
              className={css(
                column.className,
                column.isMultiline && rowClassNames.isMultiline,
                column.isRowHeader && rowClassNames.isRowHeader,
                column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded,
                column.isIconOnly && shimmer && rowClassNames.shimmerIconPlaceholder,
                shimmer && rowClassNames.shimmer,
                rowClassNames.cell
              )}
              style={{ width }}
              data-automationid="DetailsRowCell"
              data-automation-key={column.key}
            >
              {cellContent[columnIndex]}
            </div>
          );
        })}
      </div>
    );
  }

  private _getState(props: IDetailsRowFieldsProps): IDetailsRowFieldsState {
    const { item, itemIndex, onRenderItemColumn, shimmer } = props;

    return {
      cellContent: props.columns.map(column => {
        let cellContent;

        try {
          const render = column.onRender || onRenderItemColumn;

          cellContent = render && !shimmer ? render(item, itemIndex, column) : this._getCellText(item, column);
        } catch (e) {
          /* no-op */
        }

        return cellContent;
      })
    };
  }

  private _getCellText(item: any, column: IColumn): void {
    let value = item && column && column.fieldName ? item[column.fieldName] : '';

    if (value === null || value === undefined) {
      value = '';
    }

    return value;
  }
}
