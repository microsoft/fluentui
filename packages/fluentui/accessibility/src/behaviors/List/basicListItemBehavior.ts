import { Accessibility } from '../../types';
import { ListItemBehaviorProps } from './listItemBehavior';

/**
 * @description
 * The 'listitem' role is used to identify an element that is a single item in a list.
 *
 * @specification
 * Adds role='listitem'.
 */
export const basicListItemBehavior: Accessibility<ListItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'listitem',
    },
  },
});
