import { Accessibility } from '../../types';
import { tableRowBehavior } from './tableRowBehavior';

/**
 * @description
 * Basic behavior for static table - a static tabular structure containing one or more rows that each contain one or more cells; it is not an interactive widget
 * @specification
 * Adds role='table'.
 * Applies 'tableRowBehavior' for 'row' child component.
 */
export const tableBehavior: Accessibility<TableBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'table',
    },
  },
  childBehaviors: {
    row: tableRowBehavior,
  },
});

export type TableBehaviorProps = never;
