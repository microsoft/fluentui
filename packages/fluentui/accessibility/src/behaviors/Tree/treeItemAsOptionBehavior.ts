import * as _ from 'lodash';
import { Accessibility } from '../../types';
import { treeItemBehavior, TreeItemBehaviorProps } from './treeItemBehavior';
import { treeTitleAsOptionBehavior } from './treeTitleAsOptionBehavior';

/**
 * @description
 * Adds role 'option' to a non-leaf item.
 * Adds 'aria-selected' to a non-leaf item if it is selectable, based on the 'selected' property
 */
export const treeItemAsOptionBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        ...(props.hasSubtree && {
          role: 'option',
          ...(props.selectable && {
            'aria-selected': !!props.selected,
          }),
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
