import { clsx } from 'clsx';
import type { SwatchPickerState } from './SwatchPicker.types';

import styles from './SwatchPicker.module.css';

/**
 * Public identity class for SwatchPicker.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-SwatchPicker`) is no
 * longer rendered; there is no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + swatchPickerClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(swatchPickerClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const swatchPickerClassNames: { root: string } = {
  root: 'group/fui-swatch-picker',
};

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    swatchPickerClassNames.root,
    state.isGrid ? styles.grid : styles.row,
    state.spacing === 'small' ? styles['spacing-small'] : styles['spacing-medium'],
    state.root.className,
  );

  return state;
};
