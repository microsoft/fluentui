'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitNavItemSlots, SplitNavItemState } from './SplitNavItem.types';
import { useRootDefaultClassName } from '../sharedNavStyles.styles.css';
import styles from './SplitNavItem.module.css';

export const splitNavItemClassNames: SlotClassNames<SplitNavItemSlots> = {
  root: 'fui-SplitNavItem',
  navItem: 'fui-SplitNavItem__navItem',
  actionButton: 'fui-SplitNavItem__actionButton',
  toggleButton: 'fui-SplitNavItem__toggleButton',
  menuButton: 'fui-SplitNavItem__menuButton',
  /**
   * Tooltips don't have a class name prop, so this is just to satisfy the linter.
   */
  actionButtonTooltip: 'fui-SplitNavItem__actionButtonTooltip',
  toggleButtonTooltip: 'fui-SplitNavItem__toggleButtonTooltip',
  menuButtonTooltip: 'fui-SplitNavItem__menuButtonTooltip',
};

export const useSplitNavItemStyles_unstable = (state: SplitNavItemState): SplitNavItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    splitNavItemClassNames.root,
    rootDefaultClassName,
    styles.root,
    styles[state.density],
    state.root.className,
  );
  if (state.navItem) {
    // eslint-disable-next-line react-hooks/immutability
    state.navItem.className = clsx(splitNavItemClassNames.navItem, styles.navItem, state.navItem.className);
  }
  if (state.actionButton) {
    // eslint-disable-next-line react-hooks/immutability
    state.actionButton.className = clsx(
      splitNavItemClassNames.actionButton,
      styles.secondary,
      state.actionButton.className,
    );
  }
  if (state.toggleButton) {
    // eslint-disable-next-line react-hooks/immutability
    state.toggleButton.className = clsx(
      splitNavItemClassNames.toggleButton,
      styles.secondary,
      state.toggleButton.className,
    );
  }
  if (state.menuButton) {
    // eslint-disable-next-line react-hooks/immutability
    state.menuButton.className = clsx(splitNavItemClassNames.menuButton, styles.secondary, state.menuButton.className);
  }
  return state;
};
