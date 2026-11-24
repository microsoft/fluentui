'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TreeItemPersonaLayoutState, TreeItemPersonaLayoutSlots } from './TreeItemPersonaLayout.types';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import styles from './TreeItemPersonaLayout.module.css';

export const treeItemPersonaLayoutClassNames: SlotClassNames<TreeItemPersonaLayoutSlots> = {
  root: 'fui-TreeItemPersonaLayout',
  media: 'fui-TreeItemPersonaLayout__media',
  description: 'fui-TreeItemPersonaLayout__description',
  main: 'fui-TreeItemPersonaLayout__main',
  expandIcon: 'fui-TreeItemPersonaLayout__expandIcon',
  aside: 'fui-TreeItemPersonaLayout__aside',
  actions: 'fui-TreeItemPersonaLayout__actions',
  selector: 'fui-TreeItemPersonaLayout__selector',
};

export const useTreeItemPersonaLayoutStyles_unstable = (
  state: TreeItemPersonaLayoutState,
): TreeItemPersonaLayoutState => {
  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    treeItemPersonaLayoutClassNames.root,
    styles.root,
    styles[itemType],
    styles[appearance],
    styles[size],
    state.description && styles.withDescription,
    state.root.className,
  );
  if (state.media) {
    // eslint-disable-next-line react-hooks/immutability
    state.media.className = clsx(treeItemPersonaLayoutClassNames.media, styles.media, state.media.className);
  }
  if (state.main) {
    // eslint-disable-next-line react-hooks/immutability
    state.main.className = clsx(treeItemPersonaLayoutClassNames.main, styles.main, state.main.className);
  }
  if (state.description) {
    // eslint-disable-next-line react-hooks/immutability
    state.description.className = clsx(
      treeItemPersonaLayoutClassNames.description,
      styles.description,
      state.description.className,
    );
  }
  if (state.actions) {
    // eslint-disable-next-line react-hooks/immutability
    state.actions.className = clsx(treeItemPersonaLayoutClassNames.actions, styles.actions, state.actions.className);
  }
  if (state.aside) {
    // eslint-disable-next-line react-hooks/immutability
    state.aside.className = clsx(treeItemPersonaLayoutClassNames.aside, styles.aside, state.aside.className);
  }
  if (state.expandIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.expandIcon.className = clsx(
      treeItemPersonaLayoutClassNames.expandIcon,
      styles.expandIcon,
      state.expandIcon.className,
    );
  }
  if (state.selector) {
    // eslint-disable-next-line react-hooks/immutability
    state.selector.className = clsx(treeItemPersonaLayoutClassNames.selector, state.selector.className);
  }
  return state;
};
