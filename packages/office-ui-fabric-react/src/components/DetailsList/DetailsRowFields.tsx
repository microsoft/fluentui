import * as React from 'react';
import { IColumn } from './DetailsList.types';
import { css } from '../../Utilities';
import { IDetailsRowFieldsProps } from './DetailsRowFields.types';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';

const getCellText = (item: any, column: IColumn): string => {
  let value = item && column && column.fieldName ? item[column.fieldName] : '';

  if (value === null || value === undefined) {
    value = '';
  }

  return value;
};

/**
 * Component for rendering a row's cells in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
export class DetailsRowFields extends React.PureComponent<IDetailsRowFieldsProps> {
  private _cellValueKeys: {
    [columnKey: string]: string | undefined;
  };

  constructor(props: IDetailsRowFieldsProps) {
    super(props);

    this._cellValueKeys = {};
  }

  public render(): JSX.Element {
    const {
      columns,
      columnStartIndex,
      shimmer,
      rowClassNames,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
      item,
      itemIndex,
      onRenderItemColumn,
      getCellValueKey,
      cellsByColumn,
      enableUpdateAnimations
    } = this.props;

    const cellValueKeys = this._cellValueKeys;

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

          const { onRender = onRenderItemColumn, getValueKey = getCellValueKey } = column;
          const cellContentsRender =
            cellsByColumn && column.key in cellsByColumn
              ? cellsByColumn[column.key]
              : onRender && !shimmer
                ? onRender(item, itemIndex, column)
                : getCellText(item, column);

          const previousValueKey = cellValueKeys[column.key];

          const cellValueKey = enableUpdateAnimations && getValueKey ? getValueKey(item, itemIndex, column) : undefined;

          let showAnimation = false;

          if (cellValueKey !== undefined && previousValueKey !== undefined && cellValueKey !== previousValueKey) {
            showAnimation = true;
          }

          cellValueKeys[column.key] = cellValueKey;

          // generate a key that auto-dirties when content changes, to force the container to re-render, to trigger animation
          const key = `${column.key}${cellValueKey !== undefined ? `-${cellValueKey}` : ''}`;
          return (
            <div
              key={key}
              role={column.isRowHeader ? 'rowheader' : 'gridcell'}
              aria-colindex={columnIndex + columnStartIndex + 1}
              className={css(
                column.className,
                column.isMultiline && rowClassNames.isMultiline,
                column.isRowHeader && rowClassNames.isRowHeader,
                column.isIconOnly && shimmer && rowClassNames.shimmerIconPlaceholder,
                shimmer && rowClassNames.shimmer,
                rowClassNames.cell,
                column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded,
                showAnimation && rowClassNames.cellAnimation
              )}
              style={{ width }}
              data-automationid="DetailsRowCell"
              data-automation-key={column.key}
            >
              {cellContentsRender}
            </div>
          );
        })}
      </div>
    );
  }
}
