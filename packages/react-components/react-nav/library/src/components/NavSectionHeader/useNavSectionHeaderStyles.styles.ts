import { clsx } from 'clsx';

import type { NavSectionHeaderState } from './NavSectionHeader.types';

import styles from './NavSectionHeader.module.css';

/**
 * NavSectionHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const navSectionHeaderClassNames: { root: string } = {
  root: 'group/fui-nav-section-header',
};

/**
 * Apply styling to the NavSectionHeader slots based on the state
 */
export const useNavSectionHeaderStyles_unstable = (state: NavSectionHeaderState): NavSectionHeaderState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // jsdom `:scope` polyfill builds its anchor from `escape(element.classList[0])` and the
  // `/` survives that escaping into an invalid selector, throwing a render-time
  // `AggregateError` (D15.1). Before D16 the `fui-NavSectionHeader` static held that
  // position.
  state.root.className = clsx(styles.root, navSectionHeaderClassNames.root, state.root.className);

  return state;
};
