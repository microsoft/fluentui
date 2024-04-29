import { Accessibility } from '../../types';
import { gridRowNestedBehavior } from './gridRowNestedBehavior';
import { gridHeaderRowBehavior } from './gridHeaderRowBehavior';

/**
 * @description
 * Defines a behavior "gridHeaderRowBehavior" or "gridRowNestedBehavior" based on "header" property.
 */

export const gridRowBehavior: Accessibility<GridRowBehaviorProps> = props =>
  props.header ? gridHeaderRowBehavior(props) : gridRowNestedBehavior(props);

export type GridRowBehaviorProps = {
  /** Indicates if a table row is header. */
  header?: boolean;
  /** Indicated is table row is selected.  */
  selected?: boolean;
};
