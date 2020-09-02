import { keyboardKey } from '@fluentui/keyboard-key';

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
 */
export const treeBehavior: Accessibility<TreeBehaviorProps> = props => {
  return {
    attributes: {
      root: {
        role: 'tree',
        'aria-labelledby': props['aria-labelledby'],
        tabIndex: -1,
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
      },
    },
    childBehaviors: {
      item: treeItemBehavior,
    },
  };
};

export type TreeBehaviorProps = Pick<AccessibilityAttributes, 'aria-labelledby'>;
