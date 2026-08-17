import { clsx } from 'clsx';
import type { ToastFooterState } from './ToastFooter.types';

import styles from './ToastFooter.module.css';

/**
 * ToastFooter's public identity class — the Tailwind named-group marker
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
export const toastFooterClassNames: { root: string } = {
  root: 'group/fui-toast-footer',
};

/**
 * Apply styling to the ToastFooter slots based on the state
 */
export const useToastFooterStyles_unstable = (state: ToastFooterState): ToastFooterState => {
  // Module class FIRST, named group marker SECOND, consumer className LAST (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would splice its `/` into an invalid selector and throw a render-time
  // `AggregateError` under jsdom (D15.1). The `fui-ToastFooter` static that used to hold
  // index 0 is gone (D16.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ToastFooter.module.css, not by
  // the order of these arguments.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(styles.root, toastFooterClassNames.root, state.root.className);

  return state;
};
