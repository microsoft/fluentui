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
import type { TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { useOptionGroupStyles_unstable } from '@fluentui/react-combobox';

import styles from './TagPickerOptionGroup.module.css';

/**
 * Public identity class for TagPickerOptionGroup.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target. The `label` key was removed together with the
 * `fui-TagPickerOptionGroup__label` BEM static (DECISIONS.md D16.1/D16.5): there is no public
 * class-name handle on component internals.
 *
 * Note this root ALSO carries `optionGroupClassNames.root` (`group/fui-option-group`), because
 * a TagPickerOptionGroup IS an OptionGroup — the delegation to `useOptionGroupStyles_unstable`
 * below stamps it on this same element. `group/fui-tag-picker-option-group` narrows to this
 * subtype.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tagPickerOptionGroupClassNames: { root: string } = {
  root: 'group/fui-tag-picker-option-group',
};

/**
 * Apply styling to the TagPickerOptionGroup slots based on the state
 */
export const useTagPickerOptionGroupStyles = (state: TagPickerOptionGroupState): TagPickerOptionGroupState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = useOptionGroupStyles_unstable(state);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state = {
    ...state,
    root: { ...state.root, className: clsx(styles.root, tagPickerOptionGroupClassNames.root, state.root.className) },
  };

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  return state;
};
