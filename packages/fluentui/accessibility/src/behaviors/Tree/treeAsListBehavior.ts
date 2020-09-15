import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { treeBehavior, TreeBehaviorProps } from './treeBehavior';
import { treeItemAsListItemBehavior } from './treeItemAsListItemBehavior';

/**
 * @specification
 * Adds role 'list' to 'root' slot.
 */
export const treeAsListBehavior: Accessibility<TreeBehaviorProps> = props => {
  const behavior = treeBehavior(props);
  return _.merge(behavior, {
    attributes: {
      root: {
        role: 'listbox',
      },
    },
    childBehaviors: {
      item: treeItemAsListItemBehavior,
    },
  });
};
