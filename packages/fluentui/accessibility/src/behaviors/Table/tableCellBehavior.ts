import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a table cell - a cell in a tabular container. See https://www.w3.org/TR/wai-aria-1.1/#cell
 * @specification
 * Adds role='cell'.
 */
export const tableCellBehavior: Accessibility<TableCellBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'cell',
    },
  },
});

export type TableCellBehaviorProps = never;
