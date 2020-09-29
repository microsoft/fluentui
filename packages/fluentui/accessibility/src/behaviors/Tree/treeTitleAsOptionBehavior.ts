import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { treeTitleBehavior, TreeTitleBehaviorProps } from './treeTitleBehavior';

/**
 * @description
 * Adds role 'option' if the title is a leaf node inside the tree
 * Adds 'aria-selected' to a leaf treeTitle if it is selectable, based on the 'selected' property
 */
export const treeTitleAsOptionBehavior: Accessibility<TreeTitleBehaviorProps> = props => {
  const behavior = treeTitleBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        ...(!props.hasSubtree && {
          role: 'option',
          ...(props.selectable && {
            'aria-selected': !!props.selected,
          }),
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
