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

import { clsx } from 'clsx';
import type { AriaLiveState } from './AriaLive.types';

import styles from './AriaLive.module.css';

/**
 * AriaLive's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The `fui-AriaLive__assertive` / `fui-AriaLive__polite`
 * BEM statics are gone (D16.1) and the type has narrowed from `SlotClassNames<AriaLiveSlots>`
 * to `{ root: string }`, so a read of either slot key is a compile error on the exact line
 * that would otherwise have silently stopped matching.
 *
 * The key is `root` even though `AriaLiveSlots` declares no `root` slot — the same shape
 * `react-tooltip` uses. `renderAriaLive` returns a FRAGMENT of two co-equal live regions, so
 * the component has two outermost nodes rather than one; both carry this marker, and `root`
 * names the identity rather than any single element. The two stay distinguishable through the
 * native `aria-live="assertive"` / `aria-live="polite"` attribute they already render, which
 * is what this package's own tests select on — DECISIONS.md D15.6 keeps class/attribute
 * mirrors out where a native selector already expresses the state.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + ariaLiveClassNames.root` is invalid CSS. Use
 * `fuiSelector(ariaLiveClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol and `@typescript-eslint/no-deprecated` then errors on each of those re-export
 * specifiers. The narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
  state.assertive.className = clsx(styles['live-region'], 'group/fui-aria-live', state.assertive.className);
  state.polite.className = clsx(styles['live-region'], 'group/fui-aria-live', state.polite.className);

  return state;
};
