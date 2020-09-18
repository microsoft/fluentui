import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { treeTitleBehavior, TreeTitleBehaviorProps } from './treeTitleBehavior';

/**
 * @description
 * Adds role 'treeitem' if the title is a leaf node inside the tree.
 */
export const treeTitleAsListItemTitleBehavior: Accessibility<TreeTitleBehaviorProps> = props => {
  const behavior = treeTitleBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        ...(!props.hasSubtree && {
          role: 'listitem',
        }),
      },
    },
  });

  if (process.env.NODE_ENV !== 'production' && props.hasSubtree) {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'TreeTitleList';
  }

  return definition;
};
