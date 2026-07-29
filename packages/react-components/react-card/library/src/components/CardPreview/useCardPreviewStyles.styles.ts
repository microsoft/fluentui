import { clsx } from 'clsx';
import type { CardPreviewState } from './CardPreview.types';

import styles from './CardPreview.module.css';

/**
 * CardPreview's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-CardPreview` / `fui-CardPreview__logo` BEM statics are gone (D16.1), and the type has
 * narrowed from `SlotClassNames<CardPreviewSlots>` to `{ root: string }` so that a read of
 * `logo` is a compile error on the exact line that would otherwise have silently stopped
 * matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + cardPreviewClassNames.root` is invalid CSS. Use
 * `fuiSelector(cardPreviewClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const cardPreviewClassNames: { root: string } = {
  root: 'group/fui-card-preview',
};

/**
 * Apply styling to the CardPreview slots based on the state.
 */
export const useCardPreviewStyles_unstable = (state: CardPreviewState): CardPreviewState => {
  // Module class first, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional, so
  // index 0 is always the hashed, selector-safe class. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this preview's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Read it as
  // `@variant group-…/fui-card-preview { … }` (DECISIONS.md D15). Only the root slot carries
  // a marker; `logo` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in CardPreview.module.css and
  // by block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(styles.root, 'group/fui-card-preview', state.root.className);

  if (state.logo) {
    state.logo.className = clsx(styles.logo, state.logo.className);
  }

  return state;
};
