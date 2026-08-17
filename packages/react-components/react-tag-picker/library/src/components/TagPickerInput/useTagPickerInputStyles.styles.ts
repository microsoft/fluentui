import { clsx } from 'clsx';
import type { TagPickerInputState } from './TagPickerInput.types';

import styles from './TagPickerInput.module.css';

/**
 * Public identity class for TagPickerInput.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tagPickerInputClassNames: { root: string } = {
  root: 'group/fui-tag-picker-input',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a small ENUM scale, so it takes the catalog's `size-*` variants (DECISIONS.md D3)
 * rather than a class per step. `disabled` gets NO mirror: this root IS the `<input>` and
 * `useTagPickerInputBase_unstable` hands the picker context's `disabled` straight to it, so the
 * native attribute the shared `disabled` variant already matches is always present
 * (DECISIONS.md D15.6 — mirror only what a native selector cannot reach).
 */
type TagPickerInputRootDataAttributes = {
  'data-size': TagPickerInputState['size'];
};

/**
 * Apply styling to the TagPickerInput slots based on the state
 */
export const useTagPickerInputStyles_unstable = (state: TagPickerInputState): TagPickerInputState => {
  const root = state.root as TagPickerInputState['root'] & TagPickerInputRootDataAttributes;

  root['data-size'] = state.size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.

  state.root.className = clsx(styles.root, tagPickerInputClassNames.root, state.root.className);

  return state;
};
