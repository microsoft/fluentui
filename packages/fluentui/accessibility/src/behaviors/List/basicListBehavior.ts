import { Accessibility } from '../../types';
import { ListBehaviorProps } from './listBehavior';

/**
 * @description
 * The 'list' role is used to identify an element that creates a list.
 *
 * @specification
 * Adds role='list'.
 */
export const basicListBehavior: Accessibility<ListBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'list',
    },
  },
});
