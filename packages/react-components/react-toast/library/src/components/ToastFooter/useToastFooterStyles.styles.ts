import { clsx } from 'clsx';
import type { ToastFooterState } from './ToastFooter.types';

import styles from './ToastFooter.module.css';

/**
 * ToastFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-ToastFooter` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<ToastFooterSlots>` to `{ root: string }`.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + toastFooterClassNames.root` is invalid CSS. Use
 * `fuiSelector(toastFooterClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's two, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
  state.root.className = clsx(styles.root, 'group/fui-toast-footer', state.root.className);

  return state;
};
