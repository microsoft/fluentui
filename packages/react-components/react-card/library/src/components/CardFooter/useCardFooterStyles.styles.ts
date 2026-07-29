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
import type { CardFooterState } from './CardFooter.types';

import styles from './CardFooter.module.css';

/**
 * CardFooter's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-CardFooter` / `fui-CardFooter__action` BEM statics are gone (D16.1), and the type has
 * narrowed from `SlotClassNames<CardFooterSlots>` to `{ root: string }` so that a read of
 * `action` is a compile error on the exact line that would otherwise have silently stopped
 * matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + cardFooterClassNames.root` is invalid CSS. Use
 * `fuiSelector(cardFooterClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const cardFooterClassNames: { root: string } = {
  root: 'group/fui-card-footer',
};

/**
 * Apply styling to the CardFooter slots based on the state.
 */
export const useCardFooterStyles_unstable = (state: CardFooterState): CardFooterState => {
  // Module class first, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional, so
  // index 0 is always the hashed, selector-safe class. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this footer's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Read it as
  // `@variant group-…/fui-card-footer { … }` (DECISIONS.md D15). Only the root slot carries
  // a marker; `action` does not.
  //
  // Cascade priority is decided by the `@layer fui.*` order in CardFooter.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the action slot's
  // forced-colors Button/Link rules sit at `fui.components.l2`.
  //
  // The state mutation below is preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  state.root.className = clsx(styles.root, 'group/fui-card-footer', state.root.className);

  if (state.action) {
    state.action.className = clsx(styles.action, state.action.className);
  }

  return state;
};
