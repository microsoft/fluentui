'use client';

/*
 * NOTE: this file keeps `'use client'` because
 * it still calls a React hook (`useBadgeStyles_unstable`), so `enforce-use-client` never
 * reports the directive as unnecessary. Badge and PresenceBadge call nothing after conversion
 * and carry no directive at all — the same split as react-button's Button vs ToggleButton.
 */

import { clsx } from 'clsx';
import { useBadgeStyles_unstable } from '../Badge/useBadgeStyles.styles';
import type { CounterBadgeState } from './CounterBadge.types';

import styles from './CounterBadge.module.css';

/**
 * Public identity classes for CounterBadge.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-CounterBadge`,
 * `fui-CounterBadge__icon`) are no longer rendered and the per-slot keys are gone; there is
 * no public class-name handle on component internals.
 *
 * Note this root ALSO carries `badgeClassNames.root` (`group/fui-badge`), because a
 * CounterBadge IS a Badge — the delegation to `useBadgeStyles_unstable` below stamps it on
 * this same element. `group/fui-counter-badge` narrows to this subtype.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + counterBadgeClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(counterBadgeClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const counterBadgeClassNames: { root: string } = {
  root: 'group/fui-counter-badge',
};

/**
 * Applies style classnames to slots
 */
export const useCounterBadgeStyles_unstable = (state: CounterBadgeState): CounterBadgeState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        counterBadgeClassNames.root,
        state.dot && styles.dot,
        !state.root.children && !state.dot && styles.hide,
        state.root.className,
      ),
    },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return useBadgeStyles_unstable(state) as CounterBadgeState;
};
