import * as _ from 'lodash';
import { Accessibility } from '../../types';
import { treeItemBehavior, TreeItemBehaviorProps } from './treeItemBehavior';
import { treeTitleAsOptionBehavior } from './treeTitleAsOptionBehavior';

/**
 * @description
 * Adds role 'option' to a non-leaf and selectable item.
 */
export const treeItemAsOptionBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        ...(props.hasSubtree &&
          props.selectable && {
            role: 'option',
            'aria-selected': !!props.selected,
          }),
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
