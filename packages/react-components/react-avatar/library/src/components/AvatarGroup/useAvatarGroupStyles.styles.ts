'use client';

/*
 * NOTE: this file keeps `'use client'` because
 * it still calls `useSizeStyles()`, so eslint treats the styles hook as a React hook and
 * `enforce-use-client` never reports the directive as unnecessary.
 */

import { clsx } from 'clsx';
import { useSizeStyles } from '../Avatar/useAvatarStyles.styles';
import type { AvatarGroupState } from './AvatarGroup.types';

import styles from './AvatarGroup.module.css';

/**
 * AvatarGroup's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const avatarGroupClassNames: { root: string } = {
  root: 'group/fui-avatar-group',
};

/**
 * Apply styling to the AvatarGroup slots based on the state
 */
export const useAvatarGroupStyles_unstable = (state: AvatarGroupState): AvatarGroupState => {
  const { layout, size } = state;
  const sizeStyles = useSizeStyles();

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        avatarGroupClassNames.root,
        layout === 'pie' && sizeStyles[size],
        layout === 'pie' && styles.pie,
        state.root.className,
      ),
    },
  };

  return state;
};
