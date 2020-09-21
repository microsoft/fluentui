import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { treeTitleBehavior, TreeTitleBehaviorProps } from './treeTitleBehavior';

/**
 * @description
 * For title that is a non-leaf item:
 * - Adds role 'option' when it is selectable
 * - Adds role 'listitem' when it is none-selectable
 * Adds role 'none' to a leaf item.
 */
export const treeTitleAsListItemTitleBehavior: Accessibility<TreeTitleBehaviorProps> = props => {
  const behavior = treeTitleBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        ...(!props.hasSubtree && {
          role: props.selectable ? 'option' : 'listitem',
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
