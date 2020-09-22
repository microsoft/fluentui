import * as _ from 'lodash';

import { Accessibility } from '../../types';
import { treeTitleBehavior, TreeTitleBehaviorProps } from './treeTitleBehavior';

/**
 * @specification
 * Adds role='option'.
 * Adds attribute 'aria-selected=true' based on the property 'selected' if the component has 'selectable' property to 'root' slot.
 */
export const treeTitleAsOptionBehavior: Accessibility<TreeTitleBehaviorProps> = props => {
  const behavior = treeTitleBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        role: 'option',
        ...(props.selectable && { 'aria-selected': !!props.selected }),
      },
    },
  });

  if (process.env.NODE_ENV !== 'production' && props.hasSubtree) {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'TreeTitleList';
  }

  return definition;
};
