import { keyboardKey } from '../../keyboard-key';

import { Accessibility, AccessibilityAttributes } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { treeItemBehavior } from './treeItemBehavior';

/**
 * @specification
 * Adds role 'tree' to 'root' slot.
 * Adds attribute 'tabIndex=-1' to 'root' slot.
 * Adds attribute 'aria-labelledby' based on the property 'aria-labelledby' to 'root' slot.
 * Provides arrow key navigation in vertical direction.
 * Triggers 'expandSiblings' action with '*' on 'root'.
 * Adds attribute 'aria-multiselectable=true' to 'root' slot if 'selectable' property is true. Does not set the attribute otherwise.
 */
export const treeBehavior: Accessibility<TreeBehaviorProps> = props => {
  return {
    attributes: {
      root: {
        role: 'tree',
        'aria-labelledby': props['aria-labelledby'],
        tabIndex: -1,
        ...(props.selectable && {
          'aria-multiselectable': true,
        }),
      },
    },
    keyActions: {
      root: {
        expandSiblings: {
          keyCombinations: [{ keyCode: keyboardKey['*'] }],
        },
      },
    },
    focusZone: {
      props: {
        direction: FocusZoneDirection.vertical,
        shouldFocusInnerElementWhenReceivedFocus: true,
      },
    },
    childBehaviors: {
      item: treeItemBehavior,
    },
  };
};

export type TreeBehaviorProps = Pick<AccessibilityAttributes, 'aria-labelledby'> & {
  /** Whether or not tree items are selectable. */
  selectable?: boolean;
};
