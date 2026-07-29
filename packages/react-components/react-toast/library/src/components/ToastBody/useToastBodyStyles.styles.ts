import { clsx } from 'clsx';
import type { ToastBodyState } from './ToastBody.types';

import styles from './ToastBody.module.css';

/**
 * ToastBody's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-ToastBody` / `fui-ToastBody__subtitle` BEM statics are gone (D16.1), and the type has
 * narrowed from `SlotClassNames<ToastBodySlots>` to `{ root: string }` so that a read of
 * `subtitle` is a compile error on the exact line that would otherwise have silently stopped
 * matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + toastBodyClassNames.root` is invalid CSS. Use
 * `fuiSelector(toastBodyClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's two, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
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
    'group/fui-toast-body',
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
