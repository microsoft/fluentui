'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './Tab.module.css';
import type { TabSlots, TabState } from './Tab.types';
import { useTabAnimatedIndicatorStyles_unstable } from './useTabAnimatedIndicator.styles';

export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

export const tabReservedSpaceClassNames = {
  content: 'fui-Tab__content--reserved-space',
};

export const useTabStyles_unstable = (state: TabState): TabState => {
  const { appearance, disabled, selected, size, vertical } = state;
  const isCircular = appearance === 'subtle-circular' || appearance === 'filled-circular';

  // Orthogonal size and orientation classes — CSS compound selectors handle all combinations:
  // padding, pending/active indicator positions, icon size, content size, circular padding.
  const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : undefined;
  const orientationClass = vertical ? styles.vertical : styles.horizontal;

  if (!isCircular) {
    // eslint-disable-next-line react-hooks/immutability
    state.root.className = clsx(
      tabClassNames.root,
      styles.root,
      styles.button,
      orientationClass,
      sizeClass,
      styles.focusBase,
      !disabled && appearance === 'subtle' && styles.subtle,
      !disabled && appearance === 'transparent' && styles.transparent,
      !disabled && selected && styles.selected,
      disabled && styles.disabled,
      styles.pendingBase,
      disabled && styles.pendingDisabled,
      selected && styles.activeBase,
      selected && !disabled && styles.activeSelected,
      selected && disabled && styles.activeDisabled,
      state.root.className,
    );
  } else {
    const isSubtleCircular = appearance === 'subtle-circular';
    // eslint-disable-next-line react-hooks/immutability
    state.root.className = clsx(
      tabClassNames.root,
      styles.root,
      styles.button,
      orientationClass,
      sizeClass,
      styles.circularBase,
      styles.focusCircular,
      // Appearance class: CSS handles .subtleCircular.selected, .subtleCircular.disabled, etc.
      isSubtleCircular ? styles.subtleCircular : styles.filledCircular,
      selected && styles.selected,
      disabled && styles.disabled,
      state.root.className,
    );
  }

  useTabAnimatedIndicatorStyles_unstable(state);

  if (state.icon) {
    // Icon size is driven by `.large :global(.fui-Tab__icon)` in CSS.
    // Icon fill swap (selected) is driven by `.selected :global(.fui-Tab__icon) .fui-Icon-*` in CSS.
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(tabClassNames.icon, styles.icon, state.icon.className);
  }

  const hasIcon = Boolean(state.icon);
  const positionClass = hasIcon ? styles.contentIconBefore : styles.contentNoIconBefore;

  if (state.contentReservedSpace) {
    // eslint-disable-next-line react-hooks/immutability
    state.contentReservedSpace.className = clsx(
      tabReservedSpaceClassNames.content,
      styles.content,
      positionClass,
      styles.contentPlaceholder,
      state.content.className,
    );
    // eslint-disable-next-line @typescript-eslint/no-deprecated, react-hooks/immutability
    state.contentReservedSpaceClassName = state.contentReservedSpace.className;
  }

  // Content size (large) and selected weight are handled by descendant CSS from the button's
  // .large and .selected classes — no conditional class needed in the hook.
  // eslint-disable-next-line react-hooks/immutability
  state.content.className = clsx(tabClassNames.content, styles.content, positionClass, state.content.className);

  return state;
};

// Keep the individual exports for external callers.
export const useTabIndicatorStyles_unstable = useTabStyles_unstable;
export const useTabButtonStyles_unstable = useTabStyles_unstable;
export const useTabContentStyles_unstable = useTabStyles_unstable;
