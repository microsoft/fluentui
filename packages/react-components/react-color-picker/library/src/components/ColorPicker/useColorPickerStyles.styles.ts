import { clsx } from 'clsx';
import type { ColorPickerState } from './ColorPicker.types';

import styles from './ColorPicker.module.css';

/**
 * Public identity class for ColorPicker.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-ColorPicker`) is no longer
 * rendered (DECISIONS.md D16.1).
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + colorPickerClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(colorPickerClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const colorPickerClassNames: { root: string } = {
  root: 'group/fui-color-picker',
};

/**
 * Apply styling to the ColorPicker slots based on the state
 */
export const useColorPickerStyles_unstable = (state: ColorPickerState): ColorPickerState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, colorPickerClassNames.root, state.root.className);

  return state;
};
