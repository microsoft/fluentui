'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `usePopoverSurfaceStyles_unstable`,
 * so `enforce-use-client` sees a hook call and never reports the directive as unnecessary.
 * Leaf hooks in this package call nothing and carry no directive at all; see
 * useTeachingPopoverBodyStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-popover';
import type { TeachingPopoverSurfaceState } from './TeachingPopoverSurface.types';

import styles from './TeachingPopoverSurface.module.css';

/**
 * TeachingPopoverSurface's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * This root IS react-popover's `PopoverSurface` root, so it carries TWO markers by design —
 * this one and `group/fui-popover-surface`, stamped by `usePopoverSurfaceStyles_unstable` on
 * the same element (D16.3). A descendant can address whichever identity it means. The
 * conformance suite is told about the pair through `testOptions['has-group-marker'].markers`.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const teachingPopoverSurfaceClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-surface',
};

/**
 * Apply styling to the TeachingPopoverSurface slots based on the state
 */
export const useTeachingPopoverSurfaceStyles_unstable = (
  state: TeachingPopoverSurfaceState,
): TeachingPopoverSurfaceState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, teachingPopoverSurfaceClassNames.root, state.root.className) },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  const updatedState = usePopoverSurfaceStyles_unstable(state);

  return updatedState;
};
