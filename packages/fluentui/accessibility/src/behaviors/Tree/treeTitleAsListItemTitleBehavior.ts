import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { treeTitleBehavior, TreeTitleBehaviorProps } from './treeTitleBehavior';

/**
 * @description
 * Adds role 'listitem' if the title is a leaf node inside the tree.
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

  if (process.env.NODE_ENV !== 'production') {
    if (!props.hasSubtree) definition.attributes.root['data-aa-class'] = 'TreeTitleList';
    else definition.attributes.root['data-aa-class'] = behavior.attributes.root['data-aa-class'];
  }

  return definition;
};
