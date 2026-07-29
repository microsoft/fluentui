import { clsx } from 'clsx';
import { getTriggerChild } from '@fluentui/react-utilities';
import type { OverflowComponentState } from './Overflow.types';

import styles from './Overflow.module.css';

/**
 * Public identity class for Overflow.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. It replaces the `fui-Overflow` static class this hook used to
 * render, which was removed with every other BEM static (DECISIONS.md D16.1).
 *
 * Overflow renders no element of its own: the class lands on the single child the consumer
 * passes, cloned by `renderOverflow_unstable`.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + overflowClassNames.root` is an invalid selector. Use
 * `fuiSelector(overflowClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 */
export const overflowClassNames: { root: string } = {
  root: 'group/fui-overflow',
};

export const useOverflowStyles_unstable = (state: OverflowComponentState): OverflowComponentState => {
  const child = getTriggerChild<HTMLElement>(state.children);

  // Unconditional module class FIRST, then the named group marker, then the consumer's own
  // className last (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's
  // `:scope` polyfill throws on it under jsdom (DECISIONS.md D15.1) — and `styles.root` is
  // the token that guarantees it, since clsx never drops an unconditional argument. The
  // `fui-Overflow` static that used to hold that position is gone (DECISIONS.md D16.1).
  //
  // The marker is a literal, unhashed, GLOBAL token and now Overflow's SOLE public identity
  // class: it is the only handle by which another module — in this package or any other —
  // can style an element from this Overflow's state, because `styles.root` is hashed and
  // unaddressable from outside this file. Overflow needs no state mirrors: nothing it
  // renders reads its state, and the overflow machinery already stamps `data-overflowing` /
  // `data-overflow-menu` on the elements that matter (DECISIONS.md D15.6 — data attributes
  // are a fallback, not a requirement).
  //
  // Both of Overflow's rules are UNLAYERED rather than living in a `fui.components.*`
  // layer; Overflow.module.css explains why, and there is no cascade meaning in the order
  // of these arguments either way (DECISIONS.md D2).
  //
  // The in-place mutation of `state` is deliberate and stays for now: the mixed-mode sibling
  // seam and the `customStyleHooks_unstable` contract depend on the shared object, and its
  // removal is a committed single Phase 3 sweep (DECISIONS.md D14 / CONVERSION_GUIDE §3).
  // The `react-hooks/immutability` disable the Griffel version carried is gone because the
  // rule no longer reports here — do not re-add it, the linter flags it as unused.
  state.className = clsx(styles.root, 'group/fui-overflow', child?.props.className);

  return state;
};
