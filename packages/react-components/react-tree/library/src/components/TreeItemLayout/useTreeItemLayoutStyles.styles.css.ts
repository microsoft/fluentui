'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TreeItemLayoutState, TreeItemLayoutSlots } from './TreeItemLayout.types';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import styles from './TreeItemLayout.module.css';

export const treeItemLayoutClassNames: SlotClassNames<TreeItemLayoutSlots> = {
  root: 'fui-TreeItemLayout',
  iconBefore: 'fui-TreeItemLayout__iconBefore',
  main: 'fui-TreeItemLayout__main',
  iconAfter: 'fui-TreeItemLayout__iconAfter',
  expandIcon: 'fui-TreeItemLayout__expandIcon',
  aside: 'fui-TreeItemLayout__aside',
  actions: 'fui-TreeItemLayout__actions',
  selector: 'fui-TreeItemLayout__selector',
};

export const useTreeItemLayoutStyles_unstable = (state: TreeItemLayoutState): TreeItemLayoutState => {
  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    treeItemLayoutClassNames.root,
    styles.root,
    styles[itemType],
    styles[appearance],
    styles[size],
    state.root.className,
  );
  if (state.main) {
    // eslint-disable-next-line react-hooks/immutability
    state.main.className = clsx(treeItemLayoutClassNames.main, styles.main, state.main.className);
  }
  if (state.expandIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.expandIcon.className = clsx(
      treeItemLayoutClassNames.expandIcon,
      styles.expandIcon,
      state.expandIcon.className,
    );
  }
  if (state.iconBefore) {
    // eslint-disable-next-line react-hooks/immutability
    state.iconBefore.className = clsx(
      treeItemLayoutClassNames.iconBefore,
      styles.iconBefore,
      state.iconBefore.className,
    );
  }
  if (state.iconAfter) {
    // eslint-disable-next-line react-hooks/immutability
    state.iconAfter.className = clsx(treeItemLayoutClassNames.iconAfter, styles.iconAfter, state.iconAfter.className);
  }
  if (state.actions) {
    // eslint-disable-next-line react-hooks/immutability
    state.actions.className = clsx(treeItemLayoutClassNames.actions, styles.actions, state.actions.className);
  }
  if (state.aside) {
    // eslint-disable-next-line react-hooks/immutability
    state.aside.className = clsx(treeItemLayoutClassNames.aside, styles.aside, state.aside.className);
  }
  if (state.selector) {
    // eslint-disable-next-line react-hooks/immutability
    state.selector.className = clsx(treeItemLayoutClassNames.selector, state.selector.className);
  }
  return state;
};
