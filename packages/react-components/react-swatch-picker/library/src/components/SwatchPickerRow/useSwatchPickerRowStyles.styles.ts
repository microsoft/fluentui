import { clsx } from 'clsx';
import type { SwatchPickerRowState } from './SwatchPickerRow.types';

import styles from './SwatchPickerRow.module.css';

/**
 * Public identity class for SwatchPickerRow.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-SwatchPickerRow`) is no
 * longer rendered; there is no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + swatchPickerRowClassNames.root` is an invalid selector
 * even though it type-checks. Use `fuiSelector(swatchPickerRowClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const swatchPickerRowClassNames: { root: string } = {
  root: 'group/fui-swatch-picker-row',
};

/**
 * Apply styling to the SwatchPickerRow slots based on the state
 */
export const useSwatchPickerRowStyles_unstable = (state: SwatchPickerRowState): SwatchPickerRowState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    swatchPickerRowClassNames.root,
    state.spacing === 'small' ? styles['spacing-small'] : styles['spacing-medium'],
    state.root.className,
  );

  return state;
};
