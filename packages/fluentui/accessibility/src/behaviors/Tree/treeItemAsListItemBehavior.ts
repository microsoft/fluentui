import * as _ from 'lodash';
import { Accessibility } from '../../types';
import { treeItemBehavior, TreeItemBehaviorProps } from './treeItemBehavior';
import { treeTitleAsListItemTitleBehavior } from './treeTitleAsListItemTitleBehavior';

/**
 * @description
 * Adds role 'listitem' to a non-leaf item and 'none' to a leaf item.
 */
export const treeItemAsListItemBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props);

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        ...(props.hasSubtree && {
          role: 'listitem',
        }),
      },
    },
    childBehaviors: {
      title: treeTitleAsListItemTitleBehavior,
    },
  });

  if (process.env.NODE_ENV !== 'production' && props.hasSubtree) {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'TreeItemList';
  }

  return definition;
};
