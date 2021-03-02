import { Accessibility, AriaRole } from '../../types';
import { treeTitleBehavior, TreeTitleBehaviorProps } from './treeTitleBehavior';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

/**
 * @description
 * Adds role 'option' if the title is a leaf node inside the tree
 * Adds 'aria-selected' to a leaf treeTitle if it is selectable, based on the 'selected' property
 * @specification
 * Adds attribute 'tabIndex=-1' to 'root' slot if 'hasSubtree' property is false or undefined. Does not set the attribute if true.
 * Adds attribute 'role=option' to 'root' slot if 'hasSubtree' property is false or undefined. Does not set the attribute if true.
 * Adds attribute 'aria-setsize=3' based on the property 'treeSize' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Adds attribute 'aria-posinset=2' based on the property 'index' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Triggers 'performClick' action with 'Spacebar' on 'root'.
 */
export const treeTitleAsOptionBehavior: Accessibility<TreeTitleBehaviorProps> = props => {
  const behavior = treeTitleBehavior(props);

  const definition = {
    ...behavior,
    attributes: {
      root: {
        ...(!props.hasSubtree && {
          tabIndex: -1,
          [IS_FOCUSABLE_ATTRIBUTE]: true,
          role: 'option' as AriaRole,
          'aria-setsize': props.treeSize,
          'aria-posinset': props.index,
          ...(props.selectable && { 'aria-selected': !!props.selected }),
        }),
      },
    },
  };

  if (process.env.NODE_ENV !== 'production') {
    if (!props.hasSubtree) definition.attributes.root['data-aa-class'] = 'TreeTitleOption';
    else definition.attributes.root['data-aa-class'] = behavior.attributes.root['data-aa-class'];
  }

  return definition;
};
