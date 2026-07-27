'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SpinnerSlots, SpinnerState } from './Spinner.types';

import styles from './Spinner.module.css';

export const spinnerClassNames: SlotClassNames<SpinnerSlots> = {
  root: 'fui-Spinner',
  spinner: 'fui-Spinner__spinner',
  spinnerTail: 'fui-Spinner__spinnerTail',
  label: 'fui-Spinner__label',
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

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Spinner.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including why the label slot's rules
  // live in `fui.components.l2`.
  state.root.className = clsx(spinnerClassNames.root, styles.root, state.root.className);

  if (state.spinner) {
    state.spinner.className = clsx(
      spinnerClassNames.spinner,
      styles.spinner,
      appearance === 'inverted' && styles.spinnerInverted,
      state.spinner.className,
    );
  }

  if (state.spinnerTail) {
    // The `dir === 'rtl' && spinnerStyles.rtlTail` branch this replaces is now the
    // `@variant rtl` block in the module — the conic-gradient mirrors are value-level RTL
    // flips, so they stay explicit CSS rather than logical properties (DECISIONS.md D5).
    state.spinnerTail.className = clsx(spinnerClassNames.spinnerTail, styles.spinnerTail, state.spinnerTail.className);
  }

  if (state.label) {
    state.label.className = clsx(
      spinnerClassNames.label,
      styles.label,
      appearance === 'inverted' && styles.labelInverted,
      state.label.className,
    );
  }

  return state;
};
