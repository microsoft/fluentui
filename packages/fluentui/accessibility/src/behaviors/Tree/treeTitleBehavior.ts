import { EnterKey, SpacebarKey, keyboardKey } from '../../keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility, AriaRole } from '../../types';

/**
 * @description
 *  Adds attribute 'aria-checked=true' based on the properties 'selectable' & 'selected' if the component has 'hasSubtree' property false or undefined. Does not set anything if true.
 *  Triggers 'performClick' action with 'Spacebar' on 'root', when tree title is selectable.
 *  @specification
 * Adds attribute 'tabIndex=-1' to 'root' slot if 'hasSubtree' property is false or undefined. Does not set the attribute if true.
 * Adds attribute 'role=treeitem' to 'root' slot if 'hasSubtree' property is false or undefined. Does not set the attribute if true.
 * Adds attribute 'aria-setsize=3' based on the property 'treeSize' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Adds attribute 'aria-posinset=2' based on the property 'index' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Adds attribute 'aria-level=1' based on the property 'level' if the component has 'hasSubtree' property false or undefined. Does not set anything if true..
 * Triggers 'performClick' action with 'Spacebar' on 'root'.
 */
export const treeTitleBehavior: Accessibility<TreeTitleBehaviorProps> = props => {
  const definition = {
    attributes: {
      root: {
        ...(!props.hasSubtree && {
          tabIndex: -1,
          [IS_FOCUSABLE_ATTRIBUTE]: true,
          role: 'treeitem' as AriaRole,
          'aria-setsize': props.treeSize,
          'aria-posinset': props.index,
          'aria-level': props.level,
          ...(props.selectable && { 'aria-checked': props.selected }),
        }),
      },
    },
    keyActions: {
      root: {
        performClick: {
          keyCombinations: props.selectable
            ? [{ keyCode: SpacebarKey }]
            : [{ keyCode: SpacebarKey }, { keyCode: EnterKey }],
        },
        focusParent: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        },
      },
    },
  };

  if (process.env.NODE_ENV !== 'production' && props.hasSubtree) {
    // Override the default trigger's accessibility schema class.
    definition.attributes.root['data-aa-class'] = 'ExpandableTreeTitle';
  }

  return definition;
};

export type TreeTitleBehaviorProps = {
  /** Indicated if tree title has a subtree */
  hasSubtree?: boolean;
  level?: number;
  treeSize?: number;
  index?: number;
  selected?: boolean;
  selectable?: boolean;
};
