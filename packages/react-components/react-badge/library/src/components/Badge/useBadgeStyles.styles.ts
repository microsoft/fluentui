'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import * as React from 'react';
import { clsx } from 'clsx';
import type { BadgeSlots, BadgeState } from './Badge.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Badge.module.css';

export const badgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-Badge',
  icon: 'fui-Badge__icon',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * The icon slot deliberately carries NO data attributes: both its placement
 * (`data-icon-position`) and its scale (`data-size`) are selected from the root, and its
 * margin is additionally gated on the root's `data-empty` — the same three attributes the
 * react-button conversion established.
 *
 * `data-empty` mirrors Griffel's gate on the icon margin, which is
 * `React.Children.toArray(state.root.children).length > 0` and NOT `!!children`: a badge
 * whose only child is the number `0` must still render as text and keep the icon margin
 * (the edge case the original code comments on). `React.Children.toArray` drops
 * `null`/`undefined`/booleans but keeps `0`, so it is reproduced verbatim here rather
 * than simplified to a truthiness check.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-empty="false"` and still match
 * `[data-empty]`.
 */
type BadgeRootDataAttributes = {
  'data-size': BadgeState['size'];
  'data-icon-position'?: BadgeState['iconPosition'];
  'data-empty'?: true;
};

/**
 * Applies style classnames to slots
 */
export const useBadgeStyles_unstable = (state: BadgeState): BadgeState => {
  const { appearance, color, iconPosition, shape, size } = state;

  // `smallToTiny` (`size === 'small' || 'extra-small' || 'tiny'`) is gone from JS: it gated
  // `fontSmallToTiny` and `roundedSmallToTiny`, both of which are now expressed in CSS by
  // the shared `size-small-or-below` variant reading the `data-size` attribute below.
  const isEmpty = React.Children.toArray(state.root.children).length === 0;

  const root = state.root as BadgeState['root'] & BadgeRootDataAttributes;

  root['data-size'] = size;
  root['data-icon-position'] = state.icon ? iconPosition : undefined;
  root['data-empty'] = isEmpty || undefined;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Badge's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Badge needs no state mirrors:
  // `data-size`, `data-icon-position` and `data-empty` are already stamped on this very
  // element above, so `@variant group-size-tiny/fui-badge` etc. work as-is (DECISIONS.md
  // D15, Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in Badge.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // `styles.medium`, `styles.circular`, `styles.filled`, `styles.ghost` and `styles.tint`
  // are intentionally undefined: those Griffel slices are `{}` (their values come from the
  // reset, or the appearance has no shared colors), so the module emits no rule for them
  // and clsx drops them — matching the empty class string Griffel produces today.
  state.root.className = clsx(
    badgeClassNames.root,
    'group/fui-badge',
    styles.root,
    styles[shape],
    appearance === 'ghost' && styles['border-ghost'],
    styles[appearance],
    styles[`${appearance}-${color}` as const],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(badgeClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
