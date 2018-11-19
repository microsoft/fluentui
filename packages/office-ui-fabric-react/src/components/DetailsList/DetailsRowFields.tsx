import * as React from 'react';
import { IColumn } from './DetailsList.types';
import { BaseComponent, css } from '../../Utilities';
import { IDetailsRowFieldsProps } from './DetailsRowFields.types';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';

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
    const { columns, columnStartIndex, shimmer, rowClassNames, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = this.props;

    const { cellContent } = this.state;

    return (
      <div className={rowClassNames.fields} data-automationid="DetailsRowFields" role="presentation">
        {columns.map((column, columnIndex) => {
          const width: string | number =
            typeof column.calculatedWidth === 'undefined'
              ? 'auto'
              : column.calculatedWidth +
                cellStyleProps.cellLeftPadding +
                cellStyleProps.cellRightPadding +
                (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0);

          return (
            <div
              key={columnIndex}
              role={column.isRowHeader ? 'rowheader' : 'gridcell'}
              aria-colindex={columnIndex + columnStartIndex + 1}
              className={css(
                column.className,
                column.isMultiline && rowClassNames.isMultiline,
                column.isRowHeader && rowClassNames.isRowHeader,
                column.isIconOnly && shimmer && rowClassNames.shimmerIconPlaceholder,
                shimmer && rowClassNames.shimmer,
                rowClassNames.cell,
                column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded
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
