import { clsx } from 'clsx';
import type { TagPickerListState } from './TagPickerList.types';

import styles from './TagPickerList.module.css';

/**
 * Public identity class for TagPickerList.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target.
 *
 * Note this root ALSO carries `listboxClassNames.root` (`group/fui-listbox`), because a
 * TagPickerList IS a Listbox — the `root` slot's elementType is react-combobox's `<Listbox>`,
 * whose own hook stamps that marker on this same element. `group/fui-tag-picker-list` narrows
 * to this subtype.
 *
 * The value is a class TOKEN, not a selector — `'.' + tagPickerListClassNames.root` is invalid
 * CSS, because the `/` must be escaped in a selector. Use
 * `fuiSelector(tagPickerListClassNames.root)` from `@fluentui/react-utilities`.
 */
export const tagPickerListClassNames: { root: string } = {
  root: 'group/fui-tag-picker-list',
};

/**
 * Apply styling to the TagPickerList slots based on the state
 */
export const useTagPickerListStyles_unstable = (state: TagPickerListState): TagPickerListState => {
  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The `<Listbox>` this
  // slot renders as prepends its OWN unconditional class ahead of all of this, so index 0 is
  // doubly safe; leading with `styles.root` keeps that a property of this file rather than of
  // another package's hook.
  //
  // Both module classes live in `@layer fui.components.l2` so they keep beating Listbox's l1
  // rules — in particular `collapsed`'s `display: none` over Listbox's `display: flex` — without
  // depending on stylesheet load order. See TagPickerList.module.css.
  //
  // No `data-*` mirror is minted: `open` drives one unconditional-vs-absent module class and no
  // descendant selector needs to read it (DECISIONS.md D15.6).

  state.root.className = clsx(
    styles.root,
    tagPickerListClassNames.root,
    !state.open && styles.collapsed,
    state.root.className,
  );

  return state;
};
