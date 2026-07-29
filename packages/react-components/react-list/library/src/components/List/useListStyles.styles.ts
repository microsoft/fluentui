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
import type { ListState } from './List.types';

import styles from './List.module.css';

/**
 * Public identity classes for List.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a selector
 * and as a `group-*` variant target. The BEM statics (`fui-List`) were removed in D16.1;
 * there is no public class-name handle on component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + listClassNames.root` is a `SyntaxError`. Use `fuiSelector(listClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (D16.5).
 */
export const listClassNames: { root: string } = {
  root: 'group/fui-list',
};

/**
 * Apply styling to the List slots based on the state.
 *
 * List has no enum or state slices — its entire Griffel definition was one
 * `makeResetStyles`, now `@layer fui.base` in List.module.css — so no data attributes are
 * stamped here.
 */
export const useListStyles_unstable = (state: ListState): ListState => {
  // Module class FIRST, then the named group marker, consumer className last (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so it is always the leading token and the marker
  // is never `classList[0]` — nwsapi's `:scope` polyfill throws on the `/` under jsdom
  // (D15.1). Before the statics sweep the `fui-List` class held that position incidentally;
  // now it is held explicitly by the hashed CSS-Modules class. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this List's state, because `styles.root` is
  // hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // List stamps no attributes of its own, so the marker's value here is structural rather
  // than stateful: it gives a ListItem — or a consumer's cell — an ancestor handle for the
  // pseudo-class states (`group-hover/fui-list`, `group-focus-within/fui-list`,
  // `group-rtl/fui-list`), which need no mirroring (D15.6).
  //
  // Cascade priority is decided by the `@layer fui.*` order in List.module.css, not by the
  // order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(styles.root, 'group/fui-list', state.root.className);

  return state;
};
