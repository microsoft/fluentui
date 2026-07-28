'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration): this file needs NO
 * `enforce-use-client` suppression and KEEPS its `react-hooks/immutability` disable — it
 * still calls `useSizeStyles()`, so eslint still treats the styles hook as a React hook and
 * both rules apply to it exactly as before (react-badge CounterBadge precedent). The
 * state-mutation contract itself is deliberately preserved (DECISIONS.md D14).
 */

import { clsx } from 'clsx';
import { useSizeStyles } from '../Avatar/useAvatarStyles.styles';
import type { AvatarGroupSlots, AvatarGroupState } from './AvatarGroup.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './AvatarGroup.module.css';

export const avatarGroupClassNames: SlotClassNames<AvatarGroupSlots> = {
  root: 'fui-AvatarGroup',
};

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  const { layout, size } = state;
  const sizeStyles = useSizeStyles();

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in AvatarGroup.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces. The conditions are unchanged.
  //
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    avatarGroupClassNames.root,
    styles.root,
    layout === 'pie' && sizeStyles[size],
    layout === 'pie' && styles.pie,
    state.root.className,
  );

  return state;
};
