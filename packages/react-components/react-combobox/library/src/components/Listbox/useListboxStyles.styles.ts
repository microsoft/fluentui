import { clsx } from 'clsx';
import type { ListboxState } from './Listbox.types';

import styles from './Listbox.module.css';

/**
 * Public identity class for Listbox.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `fui-Listbox` BEM static is no longer rendered
 * (DECISIONS.md D16.1/D16.5).
 *
 * The value is a class TOKEN, not a selector — `'.' + listboxClassNames.root` is invalid CSS,
 * because the `/` must be escaped in a selector. Use `fuiSelector(listboxClassNames.root)` from
 * `@fluentui/react-utilities` (DECISIONS.md D16.5).
 */
export const listboxClassNames: { root: string } = {
  root: 'group/fui-listbox',
};

/**
 * Apply styling to the Listbox slots based on the state
 */
export const useListboxStyles_unstable = (state: ListboxState): ListboxState => {
  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The consumer
  // className is what carries Combobox's / Dropdown's `listbox` slot classes when this
  // Listbox is rendered as their popup, so they keep winning: their rules sit in
  // `fui.components.l2`, this file's in `fui.components.l1`.
  //
  // Listbox stamps no `data-*` mirror: it holds no state a descendant could read that a
  // native selector does not already express (DECISIONS.md D15.6).
  state.root.className = clsx(styles.root, 'group/fui-listbox', state.root.className);

  return state;
};
