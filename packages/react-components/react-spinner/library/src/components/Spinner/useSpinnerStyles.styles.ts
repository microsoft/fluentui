import { clsx } from 'clsx';
import type { SpinnerState } from './Spinner.types';

import styles from './Spinner.module.css';

/**
 * Public identity class for Spinner.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. The `spinner`, `spinnerTail` and `label` keys were removed along
 * with the BEM statics (DECISIONS.md D16.1 / D16.5): there is no public class-name handle on
 * component internals.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + spinnerClassNames.root` is an invalid selector. Use
 * `fuiSelector(spinnerClassNames.root)` from `@fluentui/react-utilities` at every selector
 * site (DECISIONS.md D16.5).
 */
export const spinnerClassNames: { root: string } = {
  root: 'group/fui-spinner',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Both names come from
 * the headless preview's vocabulary (reports/headless-precedent.md).
 *
 * `data-orientation` carries the `labelPosition === 'above' || labelPosition === 'below'`
 * branch the Griffel hook used to pick `rootStyles.vertical`: that condition is exactly
 * "stack the slots on the block axis", so it reuses the catalog's existing
 * `vertical`/`horizontal` pair (react-divider's encoding for the same flex-direction
 * switch) rather than introducing a Spinner-only label-position variant. The individual
 * label positions are not exposed — Griffel never distinguished `above` from `below`
 * either, and only the rendered ORDER (renderSpinner) depends on the rest.
 *
 * `data-size` sits on the ROOT even though the sized elements are the `spinner` and
 * `label` slots. It cannot ride the label slot: that slot renders `@fluentui/react-label`'s
 * `Label`, whose own `useLabelStyles_unstable` stamps `root['data-size']` from Label's
 * `size` prop and would overwrite it. Driving both slots from the root's attribute is also
 * the react-button precedent (`data-size` on the Button root selects its icon slot).
 *
 * No presence flags here, so nothing needs the `flag || undefined` form the other
 * converted packages use.
 */
type SpinnerRootDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
  'data-size': SpinnerState['size'];
};

/**
 * Apply styling to the Spinner slots based on the state
 */
export const useSpinnerStyles_unstable = (state: SpinnerState): SpinnerState => {
  const { labelPosition, size, appearance } = state;

  const root = state.root as SpinnerState['root'] & SpinnerRootDataAttributes;

  root['data-orientation'] = labelPosition === 'above' || labelPosition === 'below' ? 'vertical' : 'horizontal';
  root['data-size'] = size;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, spinnerClassNames.root, state.root.className);

  // Sub-slots: the statics are gone and the hashed module class leads each one. No marker
  // rides a sub-slot, so D15.1 is not in play here (statics-removal design §4c).
  if (state.spinner) {
    state.spinner.className = clsx(
      styles.spinner,
      appearance === 'inverted' && styles['spinner-inverted'],
      state.spinner.className,
    );
  }

  if (state.spinnerTail) {
    // The `dir === 'rtl' && spinnerStyles.rtlTail` branch this replaces is now the
    // `@variant rtl` block in the module — the conic-gradient mirrors are value-level RTL
    // flips, so they stay explicit CSS rather than logical properties (DECISIONS.md D5).
    state.spinnerTail.className = clsx(styles['spinner-tail'], state.spinnerTail.className);
  }

  if (state.label) {
    state.label.className = clsx(
      styles.label,
      appearance === 'inverted' && styles['label-inverted'],
      state.label.className,
    );
  }

  return state;
};
