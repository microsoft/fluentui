'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeResetStyles`
 * is gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { MenuGridRowState } from './MenuGridRow.types';

import styles from './MenuGridRow.module.css';

/**
 * Public identity class for MenuGridRow.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. `useValidateNesting` (this package's and react-menu's) reads it
 * with `classList.contains`, which takes a TOKEN and needs no escaping.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + menuGridRowClassNames.root` is an invalid selector. Use
 * `fuiSelector(menuGridRowClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const menuGridRowClassNames: { root: string } = {
  root: 'group/fui-menu-grid-row',
};

export const useMenuGridRowStyles_unstable = (state: MenuGridRowState): MenuGridRowState => {
  // Unconditional module class FIRST, then the named group marker, with the consumer
  // className last (DECISIONS.md D16.2). The marker must never be `classList[0]` — nwsapi's
  // `:scope` polyfill throws on it under jsdom (DECISIONS.md D15.1) — and `styles.root` is
  // the token that guarantees it. The BEM static that used to hold that position is gone
  // (DECISIONS.md D16.1).
  //
  // When `MenuGridItem` renders a MenuGridRow as its root, the string that component
  // composed (its own identity local + `group/fui-menu-grid-item`) arrives here as
  // `state.root.className`, so the element carries BOTH markers — the D16.3 shape, declared
  // to react-conformance via `testOptions['has-group-marker'].markers` in
  // MenuGridItem.test.tsx.
  state.root.className = clsx(styles.root, 'group/fui-menu-grid-row', state.root.className);

  return state;
};
