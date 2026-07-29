import { clsx } from 'clsx';
import type { ToastTitleState } from './ToastTitle.types';

import styles from './ToastTitle.module.css';

/**
 * ToastTitle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-ToastTitle` / `fui-ToastTitle__media` / `fui-ToastTitle__action` BEM statics are gone
 * (D16.1), and the type has narrowed from `SlotClassNames<ToastTitleSlots>` to
 * `{ root: string }` so that a read of `media` or `action` is a compile error on the exact
 * line that would otherwise have silently stopped matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + toastTitleClassNames.root` is invalid CSS. Use
 * `fuiSelector(toastTitleClassNames.root)` from `@fluentui/react-utilities` (D16.5) — this
 * component's own conformance `getTargetElement` does exactly that.
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's two, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const toastTitleClassNames: { root: string } = {
  root: 'group/fui-toast-title',
};

/**
 * Apply styling to the ToastTitle slots based on the state
 */
export const useToastTitleStyles_unstable = (state: ToastTitleState): ToastTitleState => {
  const { intent } = state;
  const inverted = state.backgroundAppearance === 'inverted';

  // Module class FIRST, named group marker SECOND, consumer className LAST (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 is always the hashed, selector-safe
  // `fuicm-*` token — which is what keeps the marker off `classList[0]`, where nwsapi's
  // `:scope` polyfill would splice its `/` into an invalid selector and throw a render-time
  // `AggregateError` under jsdom (D15.1). The `fui-ToastTitle` static that used to hold index
  // 0 is gone (D16.1).
  //
  // Cascade priority is decided by the `@layer fui.*` order in ToastTitle.module.css, not by
  // the order of these arguments — see that file's header, in particular the note that the
  // three `color` blocks on the media slot are ordered by FILE POSITION.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(
    styles.root,
    'group/fui-toast-title',
    inverted && styles['root-inverted'],
    state.root.className,
  );

  if (state.media) {
    // `media` renders BEFORE `root` in `renderToastTitle` and is its SIBLING, not its
    // descendant, so neither the root's group marker nor a descendant selector can reach it —
    // `intent` and `backgroundAppearance` are applied here as module classes instead of the
    // `data-intent` shape react-message-bar uses (see the module header). The three
    // conditional classes reproduce mergeClasses arguments #3/#4/#5 in order; the CSS relies
    // on that order too, but through file position rather than this call.
    state.media.className = clsx(
      styles.media,
      inverted && styles['media-inverted'],
      intent && styles[`media-${intent}` as const],
      inverted && intent && styles[`media-inverted-${intent}` as const],
      state.media.className,
    );
  }

  if (state.action) {
    state.action.className = clsx(styles.action, inverted && styles['action-inverted'], state.action.className);
  }

  return state;
};
