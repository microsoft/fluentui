import * as _ from 'lodash';

import { Accessibility, AccessibilityAttributes } from '../../types';
import treeBehavior from './treeBehavior';
import treeItemAsListItemBehavior from './treeItemAsListItemBehavior';

/**
 * @specification
 * Adds role 'list' to 'root' slot.
 */
const treeAsListBehavior: Accessibility<TreeBehaviorProps> = props => {
  const behavior = treeBehavior(props);
  return _.merge(behavior, {
    attributes: {
      root: {
        role: 'list',
      },
    },
    childBehaviors: {
      item: treeItemAsListItemBehavior,
    },
  });
};

type TreeBehaviorProps = Pick<AccessibilityAttributes, 'aria-labelledby'>;

export default treeAsListBehavior;
