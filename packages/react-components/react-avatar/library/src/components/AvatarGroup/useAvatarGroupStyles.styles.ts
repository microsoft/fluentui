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

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this AvatarGroup's state, because `styles.root`
  // is hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // AvatarGroup stamps no attributes (its `layout`/`size` conditions stay resolved class
  // names, because `useGroupChildClassName` also serves AvatarGroupPopover's still-Griffel
  // trigger), so the marker's value here is structural: it is the ancestor handle an
  // AvatarGroupItem or a consumer's overflow surface can hang pseudo-class reads off
  // (`group-hover/fui-avatar-group`, `group-focus-within/fui-avatar-group`), none of which
  // need mirroring (D15.6).
  //
  // Cascade priority is decided by the `@layer fui.*` order in AvatarGroup.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces. The conditions are unchanged.
  //
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    avatarGroupClassNames.root,
    'group/fui-avatar-group',
    styles.root,
    layout === 'pie' && sizeStyles[size],
    layout === 'pie' && styles.pie,
    state.root.className,
  );

  return state;
};
