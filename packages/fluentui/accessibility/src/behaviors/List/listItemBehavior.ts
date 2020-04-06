import { Accessibility } from '../../types';
import selectableListItemBehavior from './selectableListItemBehavior';
import basicListItemBehavior from './basicListItemBehavior';
import navigableListItemBehavior from './navigableListItemBehavior';

/**
 * @description
 * Defines a behavior "BasicListItemBehavior" or "SelectableListItemBehavior" based on "selectable" property.
 */
const listItemBehavior: Accessibility<ListItemBehaviorProps> = props =>
  props.selectable
    ? selectableListItemBehavior(props)
    : props.navigable
    ? navigableListItemBehavior(props)
    : basicListItemBehavior(props);

export default listItemBehavior;

export type ListItemBehaviorProps = {
  /** Indicates if a list is a selectable list. */
  selectable?: boolean;
  /** Indicates if a list is a navigable list. */
  navigable?: boolean;
  /** Indicates if the current list item is selected. */
  selected?: boolean;
};
