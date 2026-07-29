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
import type { ToastContainerState } from './ToastContainer.types';

import styles from './ToastContainer.module.css';

/**
 * ToastContainer's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-ToastContainer` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<ToastContainerSlots>` to `{ root: string }`.
 *
 * The `timer` key goes with the narrowing, and it was already dead: `fui-ToastContainer__timer`
 * was declared here but never applied to any element by any hook, so nothing in the rendered
 * DOM ever carried it. `Timer` styles its own `<span>` from `Timer.module.css`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + toastContainerClassNames.root` is invalid CSS. Use
 * `fuiSelector(toastContainerClassNames.root)` from `@fluentui/react-utilities` (D16.5) —
 * this package's own unit tests and cypress spec do exactly that.
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol and `@typescript-eslint/no-deprecated` then errors on each of those re-export
 * specifiers. The narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const toastContainerClassNames: { root: string } = {
  root: 'group/fui-toast-container',
};

/**
 * Apply styling to the ToastContainer slots based on the state
 */
export const useToastContainerStyles_unstable = (state: ToastContainerState): ToastContainerState => {
  // Module class FIRST, named group marker SECOND, consumer className LAST (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would splice its `/` into an invalid selector and throw a render-time
  // `AggregateError` under jsdom (D15.1). The `fui-ToastContainer` static that used to hold
  // index 0 is gone (D16.1).
  //
  // This element is portalled by `Toaster` (or rendered inline when `inline` is set) and
  // wrapped by `CollapseDelayed`; neither changes the composition rules — the class still
  // arrives through this hook and the `@layer fui.*` order in ToastContainer.module.css still
  // decides cascade priority, not the order of these arguments.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(styles.root, 'group/fui-toast-container', state.root.className);

  return state;
};
