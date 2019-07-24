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
export const DetailsRowFields: React.FunctionComponent<IDetailsRowFieldsProps> = props => {
  const {
    columns,
    columnStartIndex,
    rowClassNames,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
    item,
    itemIndex,
    onRenderItemColumn,
    getCellValueKey,
    cellsByColumn
  } = props;

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
            : onRender
            ? onRender(item, itemIndex, column)
            : getCellText(item, column);

        // generate a key that auto-dirties when content changes, to force the container to re-render, to trigger animation
        const key = getValueKey ? getValueKey(item, itemIndex, column) : column.key + itemIndex;
        return (
          <div
            key={key}
            role={column.isRowHeader ? 'rowheader' : 'gridcell'}
            aria-colindex={columnIndex + columnStartIndex + 1}
            className={css(
              column.className,
              column.isMultiline && rowClassNames.isMultiline,
              column.isRowHeader && rowClassNames.isRowHeader,
              rowClassNames.cell,
              column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded,
              rowClassNames.cellAnimation
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
};
