'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike the converted leaf hooks in this package this file needs NO `enforce-use-client`
 * suppression — it still calls `useButtonStyles_unstable`, so the rule agrees the directive
 * is required. Leaf hooks that call nothing carry a trailing `eslint-disable-line` instead;
 * see useTeachingPopoverBodyStyles.styles.ts.
 */

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

import styles from './TeachingPopoverCarouselFooterButton.module.css';

/**
 * TeachingPopoverCarouselFooterButton's public identity class — the Tailwind named-group
 * marker (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TeachingPopoverCarouselFooterButton` BEM static is gone (D16.1), and the type has
 * narrowed from `SlotClassNames<TeachingPopoverCarouselFooterButtonSlots>` to
 * `{ root: string }`.
 *
 * This root is ALSO a react-button `Button` root, so it carries TWO markers by design —
 * this one and `group/fui-button`, stamped by `useButtonStyles_unstable` on the same element
 * (D16.3). A descendant, or a wrapping component, can address whichever identity it means.
 * The conformance suite is told about the pair through
 * `testOptions['has-group-marker'].markers`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + teachingPopoverCarouselFooterButtonClassNames.root` is
 * invalid CSS. Use `fuiSelector(...)` from `@fluentui/react-utilities` (D16.5);
 * `element.classList.contains(...)` is token-taking and needs no escaping.
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

  // Module class FIRST, named group marker second, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional here, and `useButtonStyles_unstable` — called LAST,
  // below — additionally prepends Button's own unconditional `styles.root`, so the token that
  // actually renders at `classList[0]` is Button's hashed module class. Either way the marker
  // is never index 0, where nwsapi's `:scope` polyfill would throw on its `/` under jsdom
  // (D15.1); asserted by `component-has-group-marker`.
  //
  // Cascade priority is decided by the `@layer fui.*` order in
  // TeachingPopoverCarouselFooterButton.module.css — every rule there is at
  // `fui.components.l2`, above react-button's l1 — not by the order of these arguments. That
  // altitude is the one deliberate behaviour decision in this conversion; the module header
  // records why, and what it changes relative to the original all-Griffel code.
  //
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        'group/fui-teaching-popover-carousel-footer-button',
        navType === 'prev' && popoverAppearance === 'brand' && styles['brand-previous'],
        navType === 'next' && popoverAppearance === 'brand' && styles['brand-next'],
        state.root.className,
      ),
    },
  };

  // Called LAST now (the Griffel version called it first and merged its output back in as the
  // trailing mergeClasses argument). `useButtonStyles_unstable` composes its own classes AHEAD
  // of the incoming className, so this string — consumer className already at its end — stays
  // at the end of the rendered `class` attribute, which is what `classname-overrides-win`
  // asserts. Same call order as react-button's own ToggleButton / CompoundButton.
  //
  // Apply underlying fluent Button styles
  state = {
    ...state,
    ...useButtonStyles_unstable(state),
  };

  return state;
};
