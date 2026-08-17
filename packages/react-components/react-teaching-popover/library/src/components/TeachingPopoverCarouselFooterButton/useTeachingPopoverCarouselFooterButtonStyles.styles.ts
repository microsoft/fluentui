'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still calls `useButtonStyles_unstable`, so
 * `enforce-use-client` sees a hook call and never reports the directive as unnecessary. Leaf
 * hooks in this package call nothing and carry no directive at all; see
 * useTeachingPopoverBodyStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

import styles from './TeachingPopoverCarouselFooterButton.module.css';

/**
 * TeachingPopoverCarouselFooterButton's public identity class — the Tailwind named-group
 * marker (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * This root is ALSO a react-button `Button` root, so it carries TWO markers by design —
 * this one and `group/fui-button`, stamped by `useButtonStyles_unstable` on the same element
 * (D16.3). A descendant, or a wrapping component, can address whichever identity it means.
 * The conformance suite is told about the pair through
 * `testOptions['has-group-marker'].markers`.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const teachingPopoverCarouselFooterButtonClassNames: { root: string } = {
  root: 'group/fui-teaching-popover-carousel-footer-button',
};

/**
 * Apply styling to the TeachingPopoverCarouselFooterButton slots based on the state
 */
export const useTeachingPopoverCarouselFooterButtonStyles_unstable = (
  state: TeachingPopoverCarouselFooterButtonState,
): TeachingPopoverCarouselFooterButtonState => {
  'use no memo'; // justified: compiler would optimize useTeachingPopoverCarouselFooterButtonStyles_unstable — manual opt-out to preserve runtime behavior

  const { navType, popoverAppearance } = state;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        teachingPopoverCarouselFooterButtonClassNames.root,
        navType === 'prev' && popoverAppearance === 'brand' && styles['brand-previous'],
        navType === 'next' && popoverAppearance === 'brand' && styles['brand-next'],
        state.root.className,
      ),
    },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    ...useButtonStyles_unstable(state),
  };

  return state;
};
