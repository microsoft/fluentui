import { makeStyles, mergeClasses } from '@griffel/react';
import type { TreeItemSlots, TreeItemState } from './TreeItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const treeItemClassNames: SlotClassNames<TreeItemSlots> = {
  root: 'fui-TreeItem',
  expandIcon: 'fui-TreeItem__expandIcon',
  beforeIcon: 'fui-TreeItem__beforeIcon',
  afterIcon: 'fui-TreeItem__afterIcon',
  actionIcon: 'fui-TreeItem__actionIcon',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {},
});

/**
 * Styles for the expand icon slot
 */
const useExpandIconStyles = makeStyles({
  base: {},
});

/**
 * Styles for the before icon slot
 */
const useBeforeIconStyles = makeStyles({
  base: {},
});

/**
 * Styles for the after icon slot
 */
const useAfterIconStyles = makeStyles({
  base: {},
});

/**
 * Styles for the action icon slot
 */
const useActionIconStyles = makeStyles({
  base: {},
});

/**
 * Apply styling to the TreeItem slots based on the state
 */
export const useTreeItemStyles_unstable = (state: TreeItemState): TreeItemState => {
  const rootStyles = useRootStyles();
  const expandIconStyles = useExpandIconStyles();
  const beforeIconStyles = useBeforeIconStyles();
  const afterIconStyles = useAfterIconStyles();
  const actionIconStyles = useActionIconStyles();

  state.root.className = mergeClasses(treeItemClassNames.root, rootStyles.root, state.root.className);

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      treeItemClassNames.expandIcon,
      expandIconStyles.base,
      state.expandIcon.className,
    );
  }

  if (state.beforeIcon) {
    state.beforeIcon.className = mergeClasses(
      treeItemClassNames.beforeIcon,
      beforeIconStyles.base,
      state.beforeIcon.className,
    );
  }

  if (state.afterIcon) {
    state.afterIcon.className = mergeClasses(
      treeItemClassNames.afterIcon,
      afterIconStyles.base,
      state.afterIcon.className,
    );
  }

  if (state.actionIcon) {
    state.actionIcon.className = mergeClasses(
      treeItemClassNames.actionIcon,
      actionIconStyles.base,
      state.actionIcon.className,
    );
  }

  return state;
};
