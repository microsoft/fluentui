import { clsx } from 'clsx';
import type { ToastBodyState } from './ToastBody.types';

import styles from './ToastBody.module.css';

/**
 * ToastBody's public identity class — the Tailwind named-group marker
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
export const toastBodyClassNames: { root: string } = {
  root: 'group/fui-toast-body',
};

/**
 * Apply styling to the ToastBody slots based on the state
 */
export const useToastBodyStyles_unstable = (state: ToastBodyState): ToastBodyState => {
  const inverted = state.backgroundAppearance === 'inverted';

  // Module class FIRST, named group marker SECOND, consumer className LAST (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would splice its `/` into an invalid selector and throw a render-time
  // `AggregateError` under jsdom (D15.1). The `fui-ToastBody` static that used to hold index 0
  // is gone (D16.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ToastBody.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(
    styles.root,
    toastBodyClassNames.root,
    inverted && styles['root-inverted'],
    state.root.className,
  );

  if (state.subtitle) {
    // Sub-slots carry no marker, so D15.1 is not in play here: the hashed module class simply
    // leads and the consumer className stays last (D16.1 — no public class-name handle on
    // component internals). `subtitle` is a SIBLING of `root`, not a descendant, which is why
    // the inverted colour is applied to it directly rather than inherited or selected from the
    // root's group marker.
    state.subtitle.className = clsx(styles.subtitle, inverted && styles['subtitle-inverted'], state.subtitle.className);
  }

  return state;
};
