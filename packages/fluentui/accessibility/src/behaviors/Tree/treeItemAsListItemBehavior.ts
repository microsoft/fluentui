import * as _ from 'lodash';
import { Accessibility } from '../../types';
import { treeItemBehavior, TreeItemBehaviorProps } from './treeItemBehavior';
import { treeTitleAsListItemTitleBehavior } from './treeTitleAsListItemTitleBehavior';

/**
 * @description
 * For a non-leaf item:
 * - Adds role 'option' when it is selectable
 * - Adds role 'listitem' when it is none-selectable
 * Adds role 'none' to a leaf item.
 */
export const treeItemAsListItemBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props);
  delete behavior.attributes.root['aria-checked'];

  const definition = _.merge(behavior, {
    attributes: {
      root: {
        ...(props.hasSubtree && {
          role: props.selectable ? 'option' : 'listitem',
          ...(props.selectable && { 'aria-selected': !!props.selected }),
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
