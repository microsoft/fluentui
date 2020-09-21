import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { treeBehavior, TreeBehaviorProps } from './treeBehavior';
import { treeItemAsListItemBehavior } from './treeItemAsListItemBehavior';

/**
 * @specification
 * Adds attribute 'role=listbox' to 'root' slot if 'selectable' property is true. Sets the attribute to 'list' otherwise.
 * Adds attribute 'aria-multiselectable=true' to 'root' slot if 'selectable' property is true. Does not set the attribute otherwise.
 */
export const treeAsListBehavior: Accessibility<TreeBehaviorProps> = props => {
  const behavior = treeBehavior(props);
  return _.merge(behavior, {
    attributes: {
      root: {
        role: props.selectable ? 'listbox' : 'list',
        ...(props.selectable && {
          'aria-multiselectable': true,
        }),
      },
    },
    childBehaviors: {
      item: treeItemAsListItemBehavior,
    },
  });
};
