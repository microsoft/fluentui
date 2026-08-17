import { clsx } from 'clsx';
import type { AriaLiveState } from './AriaLive.types';

import styles from './AriaLive.module.css';

/**
 * AriaLive's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The key is `root` even though `AriaLiveSlots` declares no `root` slot — the same shape
 * `react-tooltip` uses. `renderAriaLive` returns a FRAGMENT of two co-equal live regions, so
 * the component has two outermost nodes rather than one; both carry this marker, and `root`
 * names the identity rather than any single element. The two stay distinguishable through the
 * native `aria-live="assertive"` / `aria-live="polite"` attribute they already render, which
 * is what this package's own tests select on — DECISIONS.md D15.6 keeps class/attribute
 * mirrors out where a native selector already expresses the state.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const ariaLiveClassNames: { root: string } = {
  root: 'group/fui-aria-live',
};

/**
 * Apply styling to the AriaLive slots based on the state
 */
export const useAriaLiveStyles_unstable = (state: AriaLiveState): AriaLiveState => {
  // Module class FIRST, named group marker SECOND, consumer className LAST (DECISIONS.md
  // D16.2). `styles['live-region']` is unconditional, so index 0 is always the hashed,
  // selector-safe `fuicm-*` token — which is what keeps the marker off `classList[0]`, where
  // nwsapi's `:scope` polyfill would splice its `/` into an invalid selector and throw a
  // render-time `AggregateError` under jsdom (D15.1).
  //
  // Both live regions are outermost nodes of this component (`renderAriaLive` returns a
  // fragment, not a wrapper), so both carry the marker; they are siblings, never nested, so no
  // AriaLive group ever contains another. The Griffel hook applied ONE reset class to both,
  // and one shared module local reproduces that exactly.
  //
  // Note the argument order this replaces: AriaLive was the one hook in the package whose
  // static class sat SECOND rather than first. Argument order carries no cascade meaning
  // (D15.1) — the `@layer fui.*` order in AriaLive.module.css decides everything — so the
  // converted calls take the standard shape.
  //
  // The state mutations below are preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.assertive.className = clsx(styles['live-region'], ariaLiveClassNames.root, state.assertive.className);
  state.polite.className = clsx(styles['live-region'], ariaLiveClassNames.root, state.polite.className);

  return state;
};
