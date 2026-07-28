'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file needs NO
 * `enforce-use-client` suppression and KEEPS its `react-hooks/immutability` disables — it
 * still calls `useSizeStyles()` / `useGroupChildClassName()`, so eslint still treats the
 * styles hook as a React hook and both rules apply to it exactly as before (react-badge
 * CounterBadge precedent). The state-mutation contract itself is deliberately preserved
 * (DECISIONS.md D14).
 */

import { clsx } from 'clsx';
import { useSizeStyles } from '../../Avatar';
import type { AvatarGroupItemSlots, AvatarGroupItemState } from './AvatarGroupItem.types';
import type { AvatarGroupProps } from '../../AvatarGroup';
import type { AvatarSize } from '../../Avatar';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './AvatarGroupItem.module.css';

export const avatarGroupItemClassNames: SlotClassNames<AvatarGroupItemSlots> = {
  root: 'fui-AvatarGroupItem',
  avatar: 'fui-AvatarGroupItem__avatar',
  overflowLabel: 'fui-AvatarGroupItem__overflowLabel',
};

/**
 * Data attributes rendered on the root slot and matched by in-module attribute selectors in
 * `AvatarGroupItem.module.css`.
 *
 * `data-size` drives the pie layout's divider width only; the item's own width/height comes
 * from the shared `useSizeStyles()` classes, and the stack/spread spacing stays in JS
 * because `useGroupChildClassName` also serves AvatarGroupPopover's Griffel trigger button
 * (which stamps no attributes). `isOverflowItem` and `layout` are boolean/look conditions
 * and stay module-class branches, exactly as the Griffel hook had them.
 */
type AvatarGroupItemRootDataAttributes = {
  'data-size': AvatarSize;
};

/**
 * Apply styling to the AvatarGroupItem slots based on the state
 */
export const useAvatarGroupItemStyles_unstable = (state: AvatarGroupItemState): AvatarGroupItemState => {
  const { isOverflowItem, layout, size } = state;

  const sizeStyles = useSizeStyles();
  const groupChildClassName = useGroupChildClassName(layout, size);

  const root = state.root as AvatarGroupItemState['root'] & AvatarGroupItemRootDataAttributes;

  // eslint-disable-next-line react-hooks/immutability -- state-mutation builder, preserved per D14
  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in AvatarGroupItem.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces.
  //
  // The `dir === 'rtl'` branch that used to push `pieStyles.rtlSlices` is gone: the mirror
  // now lives in the module under the shared `rtl` variant, which resolves the computed
  // direction from the DOM (DECISIONS.md D5). `useFluent()` is therefore no longer called.
  //
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    avatarGroupItemClassNames.root,
    styles.root,
    !isOverflowItem && styles.nonOverflowItem,
    !isOverflowItem && groupChildClassName,
    !isOverflowItem && sizeStyles[size],
    !isOverflowItem && layout === 'pie' && styles.pie,
    isOverflowItem && styles.overflowItem,
    state.root.className,
  );

  // eslint-disable-next-line react-hooks/immutability
  state.avatar.className = clsx(
    avatarGroupItemClassNames.avatar,
    !isOverflowItem && styles.avatarNonOverflowItem,
    layout === 'pie' && styles.avatarPie,
    state.avatar.className,
  );

  if (state.overflowLabel) {
    // eslint-disable-next-line react-hooks/immutability
    state.overflowLabel.className = clsx(
      avatarGroupItemClassNames.overflowLabel,
      styles.overflowLabel,
      state.overflowLabel.className,
    );
  }

  return state;
};

/**
 * Hook for getting the className for the children of AvatarGroup. This hook will provide the spacing and outlines
 * needed for each layout.
 */
export const useGroupChildClassName = (layout: AvatarGroupProps['layout'], size: AvatarSize): string => {
  const layoutClasses = [];

  if (size) {
    if (layout === 'stack') {
      if (size < 56) {
        layoutClasses.push(styles.stackThick);
      } else if (size < 72) {
        layoutClasses.push(styles.stackThicker);
      } else {
        layoutClasses.push(styles.stackThickest);
      }

      if (size < 24) {
        layoutClasses.push(styles.stackXxs);
      } else if (size < 48) {
        layoutClasses.push(styles.stackXs);
      } else if (size < 96) {
        layoutClasses.push(styles.stackS);
      } else {
        layoutClasses.push(styles.stackL);
      }
    } else if (layout === 'spread') {
      if (size < 20) {
        layoutClasses.push(styles.spreadS);
      } else if (size < 32) {
        layoutClasses.push(styles.spreadMNudge);
      } else if (size < 64) {
        layoutClasses.push(styles.spreadL);
      } else {
        layoutClasses.push(styles.spreadXl);
      }
    }
  }

  return clsx(...layoutClasses);
};
