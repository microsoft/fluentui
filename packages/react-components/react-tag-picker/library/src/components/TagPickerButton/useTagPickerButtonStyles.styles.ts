import { clsx } from 'clsx';
import type { TagPickerButtonState } from './TagPickerButton.types';

import styles from './TagPickerButton.module.css';

/**
 * Public identity class for TagPickerButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tagPickerButtonClassNames: { root: string } = {
  root: 'group/fui-tag-picker-button',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type TagPickerButtonRootDataAttributes = {
  'data-size': TagPickerButtonState['size'];
};

/**
 * Apply styling to the PickerButton slots based on the state
 */
export const useTagPickerButtonStyles_unstable = (state: TagPickerButtonState): TagPickerButtonState => {
  const root = state.root as TagPickerButtonState['root'] & TagPickerButtonRootDataAttributes;

  root['data-size'] = state.size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  state.root.className = clsx(
    styles.root,
    tagPickerButtonClassNames.root,
    state.hasSelectedOption && styles['visually-hidden'],
    state.root.className,
  );

  return state;
};
