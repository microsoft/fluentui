import { Accessibility, AriaRole } from '../../types';
import { treeItemBehavior, TreeItemBehaviorProps } from './treeItemBehavior';
import { treeTitleAsOptionBehavior } from './treeTitleAsOptionBehavior';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

/**
 * @description
 * Adds role 'option' to a non-leaf item.
 * Adds 'aria-selected' to a non-leaf item if it is selectable, based on the 'selected' property
 * @specification
 * Adds attribute 'tabIndex=-1' to 'root' slot if 'hasSubtree' property is true. Does not set the attribute otherwise.
 * Adds attribute 'aria-setsize=3' based on the property 'treeSize' if the component has 'hasSubtree' property.
 * Adds attribute 'aria-posinset=2' based on the property 'index' if the component has 'hasSubtree' property.
 * Adds attribute 'role=option' to 'root' slot if 'hasSubtree' property is true. Sets the attribute to 'none' otherwise.
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'expandSiblings' action with '*' on 'root'.
 * Triggers 'focusParent' action with 'ArrowLeft' on 'root', when has a closed subtree.
 * Triggers 'collapse' action with 'ArrowLeft' on 'root', when has an opened subtree.
 * Triggers 'expand' action with 'ArrowRight' on 'root', when has a closed subtree.
 * Triggers 'focusFirstChild' action with 'ArrowRight' on 'root', when has an opened subtree.
 */
export const treeItemAsOptionBehavior: Accessibility<TreeItemBehaviorProps> = props => {
  const behavior = treeItemBehavior(props);

  const definition = {
    ...behavior,
    attributes: {
      root: {
        role: 'none',
        ...(props.hasSubtree && {
          tabIndex: -1,
          [IS_FOCUSABLE_ATTRIBUTE]: true,
          role: 'option' as AriaRole,
          'aria-setsize': props.treeSize,
          'aria-posinset': props.index,
          ...(props.selectable && { 'aria-selected': !!props.selected }),
        }),
      },
    },
    childBehaviors: {
      title: treeTitleAsOptionBehavior,
    },
  };

  if (process.env.NODE_ENV !== 'production') {
    if (props.hasSubtree) definition.attributes.root['data-aa-class'] = 'TreeItemOption';
    else definition.attributes.root['data-aa-class'] = behavior.attributes.root['data-aa-class'];
  }

  return definition;
};
