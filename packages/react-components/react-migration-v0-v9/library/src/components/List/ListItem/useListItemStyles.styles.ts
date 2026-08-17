import { clsx } from 'clsx';
import type { ListItemState } from './ListItem.types';

import styles from './ListItem.module.css';

/**
 * Public identity class for this package's v0-migration ListItem.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The BEM static `fui-ListItem` it used to hold was removed with
 * every other static (D16.1), and the six sub-slot keys (`media`, `header`, `contentWrapper`,
 * `headerMedia`, `contentMedia`, `endMedia`) went with it: D16 leaves no public class-name
 * handle on component internals, and dropping the KEYS makes a stale
 * `listItemClassNames.header` a compile error rather than a selector that silently stops
 * matching (statics-removal-design.md §3, option C).
 *
 * ⚠ The marker `group/fui-list-item` is ALSO stamped by `@fluentui/react-list`'s unrelated
 * ListItem — inherited collision, see `listClassNames` and List.module.css.
 *
 * Use `fuiSelector(listItemClassNames.root)` from `@fluentui/react-utilities` at every
 * selector site (D16.5).
 */
export const listItemClassNames: { root: string } = {
  root: 'group/fui-list-item',
};

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  // Unconditional module class FIRST, then the named group marker, then the conditional
  // module classes, with the consumer className last (DECISIONS.md D16.2). The marker must
  // never be `classList[0]` — nwsapi's `:scope` polyfill throws on it under jsdom (D15.1).
  // Cascade priority is decided by the `@layer fui.*` order in ListItem.module.css, not by
  // the order of these arguments.
  //
  // The state-mutation pattern is kept deliberately during conversion (DECISIONS.md D14).
  state.root.className = clsx(
    styles.root,
    listItemClassNames.root,
    (state.selectable || state.navigable) && styles['root-clickable'],
    state.selected && styles['root-selected'],
    state.root.className,
  );

  // `header` and `contentWrapper` are handed to <ItemLayout> by renderListItem_unstable and
  // are decorated by ItemLayout's own hook, so these classes ride at `fui.components.l2` —
  // the D16.3/M2 mechanism (JS slot composition, no selector, no public class-name handle).
  // No marker on either: only the OUTERMOST slot carries one (D15.1).
  if (state.header) {
    state.header.className = clsx(state.truncateHeader && styles.truncate, state.header?.className);
  }

  if (state.contentWrapper) {
    state.contentWrapper.className = clsx(
      styles['content-wrapper'],
      state.truncateContent && styles.truncate,
      !state.contentMedia && styles['content-wrapper-without-media'],
      state.contentWrapper?.className,
    );
  }

  return state;
};
