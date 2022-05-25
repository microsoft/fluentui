import * as React from 'react';
import { composeRenderFunction, css } from '../../Utilities';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
import type { IColumn } from './DetailsList.types';
import type { IDetailsRowFieldsProps } from './DetailsRowFields.types';
import type { IDetailsColumnFieldProps } from './DetailsColumn.types';

const getCellText = (item: any, column: IColumn): string => {
  let value = item && column && column.fieldName ? item[column.fieldName] : '';

  if (value === null || value === undefined) {
    value = '';
  }

  if (typeof value === 'boolean') {
    return value.toString();
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
    rowClassNames,
    cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
    item,
    itemIndex,
    isSelected,
    onRenderItemColumn,
    getCellValueKey,
    onRenderField: propsOnRenderField,
    cellsByColumn,
    enableUpdateAnimations,
    rowHeaderId,
  } = props;

  const cellValueKeysRef = React.useRef<{
    [columnKey: string]: string | undefined;
  }>();

  const cellValueKeys = cellValueKeysRef.current || (cellValueKeysRef.current = {});

  const defaultOnRenderField = React.useCallback(
    (fieldProps: IDetailsColumnFieldProps): JSX.Element | null => {
      const { column, cellValueKey, className, onRender, item: fieldItem, itemIndex: fieldItemIndex } = fieldProps;

      const width: string | number =
        typeof column.calculatedWidth === 'undefined'
          ? 'auto'
          : column.calculatedWidth +
            cellStyleProps.cellLeftPadding +
            cellStyleProps.cellRightPadding +
            (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0);

      const key = `${column.key}${cellValueKey !== undefined ? `-${cellValueKey}` : ''}`;

      return (
        <div
          key={key}
          id={column.isRowHeader ? rowHeaderId : undefined}
          role={column.isRowHeader ? 'rowheader' : 'gridcell'}
          aria-readonly
          className={css(
            column.className,
            column.isMultiline && rowClassNames.isMultiline,
            column.isRowHeader && rowClassNames.isRowHeader,
            rowClassNames.cell,
            column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded,
            className,
          )}
          style={{ width }}
          data-automationid="DetailsRowCell"
          data-automation-key={column.key}
        >
          {onRender(fieldItem, fieldItemIndex, column)}
        </div>
      );
    },
    [rowClassNames, cellStyleProps, rowHeaderId],
  );

  return (
    <div className={rowClassNames.fields} data-automationid="DetailsRowFields" role="presentation">
      {columns.map(column => {
        const { getValueKey = getCellValueKey } = column;

        const onRender =
          (cellsByColumn && column.key in cellsByColumn && (() => cellsByColumn[column.key])) ||
          column.onRender ||
          onRenderItemColumn ||
          defaultOnRender;

        let onRenderField = defaultOnRenderField;

        if (column.onRenderField) {
          onRenderField = composeRenderFunction(column.onRenderField, onRenderField);
        }

        if (propsOnRenderField) {
          onRenderField = composeRenderFunction(propsOnRenderField, onRenderField);
        }

        const previousValueKey = cellValueKeys[column.key];

        const cellValueKey = enableUpdateAnimations && getValueKey ? getValueKey(item, itemIndex, column) : undefined;

        let showAnimation = false;

        if (cellValueKey !== undefined && previousValueKey !== undefined && cellValueKey !== previousValueKey) {
          showAnimation = true;
        }

        cellValueKeys[column.key] = cellValueKey;

        return onRenderField({
          item,
          itemIndex,
          isSelected,
          column,
          cellValueKey,
          className: showAnimation ? rowClassNames.cellAnimation : undefined,
          onRender,
        });
      })}
    </div>
  );
};

function defaultOnRender(item?: any, index?: number, column?: IColumn): React.ReactNode {
  if (!item || !column) {
    return null;
  }

  return getCellText(item, column);
}
