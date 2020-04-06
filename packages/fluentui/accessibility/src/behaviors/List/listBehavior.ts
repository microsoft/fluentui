import { Accessibility } from '../../types';
import selectableListBehavior from './selectableListBehavior';
import basicListBehavior from './basicListBehavior';
import navigableListBehavior from './navigableListBehavior';

/**
 * @description
 * Defines a behavior 'BasicListBehavior' or 'SelectableListBehavior' based on property 'selectable'.
 */
const ListBehavior: Accessibility<ListBehaviorProps> = props =>
  props.selectable
    ? selectableListBehavior(props)
    : props.navigable
    ? navigableListBehavior(props)
    : basicListBehavior(props);

export default ListBehavior;

export type ListBehaviorProps = {
  /** Indicates if a list is a selectable list. */
  selectable?: boolean;

  /** Indicates if a list is a navigable list. */
  navigable?: boolean;

  /** Indicates if the list is horizontal. */
  horizontal?: boolean;
};
