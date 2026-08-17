import { clsx } from 'clsx';
import type { AriaLiveState } from './AriaLive.types';

import styles from './AriaLive.module.css';

/**
 * AriaLive's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The key is `root` even though `AriaLiveSlots` declares no `root` slot — the same shape
 * `react-tooltip` uses. `renderAriaLive` returns a FRAGMENT of two co-equal live regions, so
 * the component has two outermost nodes rather than one; both carry this marker, and `root`
 * names the identity rather than any single element. The two stay distinguishable through the
 * native `aria-live="assertive"` / `aria-live="polite"` attribute they already render, which
 * is what this package's own tests select on — DECISIONS.md D15.6 keeps class/attribute
 * mirrors out where a native selector already expresses the state.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const ariaLiveClassNames: { root: string } = {
  root: 'group/fui-aria-live',
};

/**
 * Apply styling to the AriaLive slots based on the state
 */
export const useAriaLiveStyles_unstable = (state: AriaLiveState): AriaLiveState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.assertive.className = clsx(styles['live-region'], ariaLiveClassNames.root, state.assertive.className);
  state.polite.className = clsx(styles['live-region'], ariaLiveClassNames.root, state.polite.className);

  return state;
};
