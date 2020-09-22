import * as _ from 'lodash';
import { Accessibility } from '../../types';
import { treeItemBehavior, TreeItemBehaviorProps } from './treeItemBehavior';
import { treeTitleAsOptionBehavior } from './treeTitleAsOptionBehavior';

/**
 * @specification
 * Adds role='option'.
 * Adds attribute 'aria-selected=true' based on the property 'selected' if the component has 'selectable' property to 'root' slot.
 */
export const treeItemAsOptionBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        role: 'option',
        ...(props.selectable && { 'aria-selected': !!props.selected }),
      },
    },
    childBehaviors: {
      title: treeTitleAsOptionBehavior,
    },
  });

  if (process.env.NODE_ENV !== 'production' && props.hasSubtree) {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'TreeItemList';
  }

  return definition;
};
