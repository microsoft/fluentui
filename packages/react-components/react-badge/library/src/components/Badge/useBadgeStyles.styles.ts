import * as React from 'react';
import { clsx } from 'clsx';
import type { BadgeState } from './Badge.types';

import styles from './Badge.module.css';

/**
 * Public identity classes for Badge.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-Badge`,
 * `fui-Badge__icon`) are no longer rendered and the per-slot keys are gone; there is no
 * public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + badgeClassNames.root` is an invalid selector even though
 * it type-checks. Use `fuiSelector(badgeClassNames.root)` from `@fluentui/react-utilities`.
 */
export const badgeClassNames: { root: string } = {
  root: 'group/fui-badge',
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    badgeClassNames.root,
    styles[shape],
    appearance === 'ghost' && styles['border-ghost'],
    styles[appearance],
    styles[`${appearance}-${color}` as const],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
