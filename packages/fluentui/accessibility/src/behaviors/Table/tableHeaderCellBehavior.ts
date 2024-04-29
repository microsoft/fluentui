import { Accessibility } from '../../types';
import { TableCellBehaviorProps } from './tableCellBehavior';
/**
 * @description
 * Behavior for a table header cell - a cell containing header information for a column.
 * See https://www.w3.org/TR/wai-aria-1.1/#columnheader
 * @specification
 * Adds role='columnheader'.
 */
export const tableHeaderCellBehavior: Accessibility<TableCellBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'columnheader',
    },
  },
});
