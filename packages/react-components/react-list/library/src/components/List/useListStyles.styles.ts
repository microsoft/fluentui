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
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, listClassNames.root, state.root.className);

  return state;
};
