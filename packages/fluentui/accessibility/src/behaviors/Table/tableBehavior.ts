import { Accessibility } from '../../types';
import tableRowBehavior from './tableRowBehavior';
import { TableProps } from '@fluentui/react-northstar';

/**
 * @description
 * Basic behavior for static table - a static tabular structure containing one or more rows that each contain one or more cells; it is not an interactive widget
 * @specification
 * Adds role='table'.
 * Applies 'tableRowBehavior' for 'row' child component.
 */
const tableBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'table',
    },
  },
  childBehaviors: {
    row: tableRowBehavior,
  },
});

export type TableBehaviorProps = Pick<TableProps, 'header'>;

export default tableBehavior;
