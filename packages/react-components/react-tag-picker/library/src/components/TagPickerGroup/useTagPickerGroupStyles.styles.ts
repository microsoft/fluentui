'use client';

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * unlike most converted styles files, this one carries NO `enforce-use-client` suppression —
 * it still delegates to another package's client styles hook, so the rule agrees `'use client'`
 * is required here and a suppression would itself be reported as an unused disable directive.
 *
 * Where the rule DOES object (a styles file whose remaining content is `clsx` plus a
 * CSS-Modules import), the suppression is a TRAILING `eslint-disable-line`, because a leading
 * block comment would push `'use client'` off line 1 of the emitted lib/lib-commonjs output.
 * Dropping the directives altogether is a Phase 3 sweep across all 180 style hooks.
 */

import { clsx } from 'clsx';
import type { TagPickerGroupState } from './TagPickerGroup.types';
import { useTagGroupStyles_unstable } from '@fluentui/react-tags';
import { tagSizeToTagPickerSize } from '../../utils/tagPicker2Tag';

import styles from './TagPickerGroup.module.css';

/**
 * Public identity class for TagPickerGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target.
 *
 * Note this root ALSO carries `tagGroupClassNames.root` (`group/fui-tag-group`), because a
 * TagPickerGroup IS a TagGroup — the delegation to `useTagGroupStyles_unstable` below stamps it
 * on this same element. `group/fui-tag-picker-group` narrows to this subtype.
 *
 * The value is a class TOKEN, not a selector — `'.' + tagPickerGroupClassNames.root` is invalid
 * CSS, because the `/` must be escaped in a selector. Use
 * `fuiSelector(tagPickerGroupClassNames.root)` from `@fluentui/react-utilities`; inside a
 * Griffel `makeStyles` key, where a call cannot be made, write the escaped literal
 * `'& > .group\\/fui-tag-picker-group'`.
 */
export const tagPickerGroupClassNames: { root: string } = {
  root: 'group/fui-tag-picker-group',
};

/**
 * Apply styling to the TagPickerGroup slots based on the state
 */
export const useTagPickerGroupStyles_unstable = (state: TagPickerGroupState): TagPickerGroupState => {
  // Delegation FIRST, exactly as before: `useTagGroupStyles_unstable` stamps its own module
  // class, its `group/fui-tag-group` marker and the `data-size` this root carries in the TAG
  // scale, then leaves the consumer className trailing. Everything this hook adds is prepended
  // to that string below, so the consumer's className stays last overall.
  useTagGroupStyles_unstable(state);

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the accumulated `state.root.className` (TagGroup's
  // classes, then the consumer's) last.
  //
  // The size class is keyed by the PICKER scale, which is why it stays a conditional module
  // class instead of joining the root's `data-size`: that attribute already exists here and
  // carries the TAG scale. See TagPickerGroup.module.css.
  //
  // Cascade priority is decided by the `@layer fui.*` order, not by the order of these
  // arguments — and note that this delegation runs the OPPOSITE way to Combobox-over-Listbox or
  // CounterBadge-over-Badge: TagGroup's classes are the LAST mergeClasses argument, so TagGroup
  // won every shared property key under Griffel. That is why this file's rules sit in
  // `fui.components.l1` rather than the usual composition altitude, and why the two property
  // sets are kept strictly disjoint (DECISIONS.md D12).
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    styles.root,
    'group/fui-tag-picker-group',
    styles[tagSizeToTagPickerSize(state.size)],
    state.root.className,
  );

  return state;
};
