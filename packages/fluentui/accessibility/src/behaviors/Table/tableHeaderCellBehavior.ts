import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a table header cell - a cell containing header information for a column.
 * See https://www.w3.org/TR/wai-aria-1.1/#columnheader
 * @specification
 * Adds role='columnheader'.
 */
const tableHeaderCellBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'columnheader'
    }
  }
});

export default tableHeaderCellBehavior;
