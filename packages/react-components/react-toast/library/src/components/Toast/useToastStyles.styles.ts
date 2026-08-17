import { clsx } from 'clsx';
import type { ToastState } from './Toast.types';

import styles from './Toast.module.css';

/**
 * Toast's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-Toast` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<ToastSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + toastClassNames.root` is invalid CSS. Use
 * `fuiSelector(toastClassNames.root)` from `@fluentui/react-utilities` (D16.5) — this
 * package's own cypress spec does exactly that.
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's two, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const toastClassNames: { root: string } = {
  root: 'group/fui-toast',
};

/**
 * Apply styling to the Toast slots based on the state
 */
export const useToastStyles_unstable = (state: ToastState): ToastState => {
  // Module class FIRST, named group marker SECOND, consumer className LAST (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would splice its `/` into an invalid selector and throw a render-time
  // `AggregateError` under jsdom (D15.1). The `fui-Toast` static that used to hold index 0 is
  // gone (D16.1); `styles.root` holds it now, and `styles.inverted` could not — it is
  // conditional on `backgroundAppearance`.
  //
  // The marker is a literal, unhashed, GLOBAL token — written literally rather than read back
  // out of `toastClassNames` — and is the only handle by which another module, in this package
  // or any other, can style an element from this Toast's state, because `styles.root` is
  // hashed and unaddressable from outside this file.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Toast.module.css, not by the
  // order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(
    styles.root,
    toastClassNames.root,
    state.backgroundAppearance === 'inverted' && styles.inverted,
    state.root.className,
  );

  return state;
};
