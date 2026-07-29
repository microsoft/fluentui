import { clsx } from 'clsx';
import type { ListState } from './List.types';

import styles from './List.module.css';

/**
 * Public identity class for this package's v0-migration List.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The BEM static `fui-List` it used to hold was removed with every
 * other static (D16.1), and the type narrows from `SlotClassNames<ListSlots>` to
 * `{ root: string }` accordingly (statics-removal-design.md §3, option C).
 *
 * ⚠ The marker `group/fui-list` is ALSO stamped by `@fluentui/react-list`'s unrelated List.
 * That collision is inherited, not introduced: both packages published the static `fui-List`
 * before this conversion (statics-removal-design.md §1g). It has no CSS effect today —
 * neither package authors a `group-<variant>/fui-list` rule — but a selector built from either
 * package's constant matches both components. See List.module.css.
 *
 * The `/` is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + listClassNames.root` is an invalid selector. Use `fuiSelector(listClassNames.root)`
 * from `@fluentui/react-utilities` at every selector site (D16.5).
 */
export const listClassNames: { root: string } = {
  root: 'group/fui-list',
};

/**
 * Apply styling to the List slots based on the state
 */
export const useListStyles_unstable = (state: ListState): ListState => {
  const layoutToStyles = {
    ['horizontal']: styles['root-horizontal'],
    ['grid']: styles['root-grid'],
    ['vertical']: undefined, // no extra styles needed, keep it in for completeness and type safety
  };

  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module class, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom (D15.1) —
  // and `styles.root` is the token that guarantees it, since clsx never drops an
  // unconditional argument. Cascade priority is decided by the `@layer fui.*` order in
  // List.module.css, not by the order of these arguments.
  //
  // The state-mutation pattern is kept deliberately during conversion (DECISIONS.md D14).
  state.root.className = clsx(styles.root, 'group/fui-list', layoutToStyles[state.layout], state.root.className);

  return state;
};
