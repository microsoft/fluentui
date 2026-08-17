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
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tagPickerListClassNames: { root: string } = {
  root: 'group/fui-tag-picker-list',
};

/**
 * Apply styling to the TagPickerList slots based on the state
 */
export const useTagPickerListStyles_unstable = (state: TagPickerListState): TagPickerListState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  state.root.className = clsx(
    styles.root,
    tagPickerListClassNames.root,
    !state.open && styles.collapsed,
    state.root.className,
  );

  return state;
};
