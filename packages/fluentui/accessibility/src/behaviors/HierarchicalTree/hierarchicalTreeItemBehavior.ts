import { keyboardKey, SpacebarKey } from '@fluentui/keyboard-key';

import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';
import { Accessibility } from '../../types';

/**
 * @description
 * Adds role 'treeitem' to a non-leaf item and 'none' to a leaf item.
 * Adds 'aria-expanded' with a value based on the 'open' prop if item is not a leaf.
 * Adds 'tabIndex' as '-1' if the item is not a leaf.
 *
 * @specification
 * Triggers 'performClick' action with 'Enter' or 'Spacebar' on 'root'.
 * Triggers 'receiveFocus' action with 'ArrowLeft' on 'root', when has an opened subtree.
 * Triggers 'collapse' action with 'ArrowLeft' on 'root', when has an opened subtree.
 * Triggers 'expand' action with 'ArrowRight' on 'root', when has a closed subtree.
 * Triggers 'focusSubtree' action with 'ArrowRight' on 'root', when has an opened subtree.
 */
export const hierarchicalTreeItemBehavior: Accessibility<HierarchicalTreeItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'none',
      ...(props.hasItems && {
        'aria-expanded': props.open,
        tabIndex: -1,
        [IS_FOCUSABLE_ATTRIBUTE]: true,
        role: 'treeitem',
      }),
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
      ...(isSubtreeOpen(props) && {
        receiveFocus: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        },
        collapse: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
        },
        focusSubtree: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        },
      }),
      ...(!isSubtreeOpen(props) && {
        expand: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
        },
      }),
    },
  },
});

export type HierarchicalTreeItemBehaviorProps = {
  /** If item is a subtree, it contains items. */
  hasItems?: boolean;
  /** If item is a subtree, it indicates if it's open. */
  open?: boolean;
};

/** Checks if current tree item has a subtree and it is opened */
const isSubtreeOpen = (props: HierarchicalTreeItemBehaviorProps): boolean => {
  const { hasItems, open } = props;
  return !!(hasItems && open);
};
