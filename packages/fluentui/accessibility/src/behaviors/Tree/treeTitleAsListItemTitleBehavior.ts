import * as _ from 'lodash';

import { Accessibility } from '../../types';
import treeTitleBehavior from './treeTitleBehavior';

/**
 * @description
 * Adds role 'treeitem' if the title is a leaf node inside the tree.
 */
const treeTitleAsListItemTitleBehavior: Accessibility<TreeTitleBehavior> = props => {
  const behavior = treeTitleBehavior(props);
  return _.merge(behavior, {
    attributes: {
      root: {
        ...(!props.hasSubtree && {
          role: 'listitem',
        }),
      },
    },
  });
};

export default treeTitleAsListItemTitleBehavior;

type TreeTitleBehavior = {
  /** Indicates whether `TreeTitle` has a subtree. */
  hasSubtree?: boolean;
};
