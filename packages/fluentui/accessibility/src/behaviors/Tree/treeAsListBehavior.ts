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
  const definition = _.merge(behavior, {
    attributes: {
      root: {
        role: 'list',
      },
    },
    childBehaviors: {
      item: treeItemAsListItemBehavior,
    },
  });

  if (process.env.NODE_ENV !== 'production') {
    definition.attributes.root['data-aa-class'] = 'TreeList';
  }
  return definition;
};
