'use client';

/*
 * NOTE on the directive above:
 * this file keeps `'use client'` because it still delegates to another package's client
 * styles hook, so `enforce-use-client` sees a hook call and never reports the directive as
 * unnecessary. Converted leaf hooks — `clsx` plus a CSS-Modules import — call nothing and
 * carry no directive at all.
 *
 * Any comment that has to sit ABOVE a surviving directive would push `'use client'` off line 1
 * of the emitted lib/lib-commonjs output, which is why this note sits below it.
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
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tagPickerGroupClassNames: { root: string } = {
  root: 'group/fui-tag-picker-group',
};

/**
 * Apply styling to the TagPickerGroup slots based on the state
 */
export const useTagPickerGroupStyles_unstable = (state: TagPickerGroupState): TagPickerGroupState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  const composedTagGroup = useTagGroupStyles_unstable(state);
  state = { ...state, ...composedTagGroup };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        styles.root,
        tagPickerGroupClassNames.root,
        styles[tagSizeToTagPickerSize(state.size)],
        state.root.className,
      ),
    },
  };

  return state;
};
