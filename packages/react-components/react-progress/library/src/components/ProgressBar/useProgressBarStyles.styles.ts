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
import type { ProgressBarSlots, ProgressBarState } from './ProgressBar.types';

import styles from './ProgressBar.module.css';

export const progressBarClassNames: SlotClassNames<Omit<ProgressBarSlots, 'indeterminateMotion'>> = {
  root: 'fui-ProgressBar',
  bar: 'fui-ProgressBar__bar',
};

// If the percentComplete is near 0, don't animate it.
// This prevents animations on reset to 0 scenarios.
const ZERO_THRESHOLD = 0.01;

/**
 * Data attributes rendered by this hook and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `thickness` is a scale prop, so it rides an attribute rather than a module class
 * (DECISIONS.md D3), the same way Button's `size` does. `data-thickness` (rather than
 * `data-size`) because `ProgressBarProps` explicitly `Omit`s `size` — the component has
 * no such prop and must not claim the attribute.
 *
 * `data-indeterminate` is a *presence* selector, so it is written `flag || undefined`:
 * React omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-indeterminate="false"` and still match `[data-indeterminate]`. It lives on the
 * bar because that is the element Griffel styled, and it reuses the catalog's existing
 * `indeterminate` variant.
 */
type ProgressBarRootDataAttributes = {
  'data-thickness': ProgressBarState['thickness'];
};

type ProgressBarBarDataAttributes = {
  'data-indeterminate'?: true;
};

/**
 * Apply styling to the ProgressBar slots based on the state
 */
export const useProgressBarStyles_unstable = (state: ProgressBarState): ProgressBarState => {
  const { color, max, shape, thickness, value } = state;
  const isIndeterminate = value === undefined;

  const root = state.root as ProgressBarState['root'] & ProgressBarRootDataAttributes;

  root['data-thickness'] = thickness;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in ProgressBar.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces, including the forced-colors
  // inversion on the bar.
  state.root.className = clsx(progressBarClassNames.root, styles.root, styles[shape], state.root.className);

  if (state.bar) {
    const bar = state.bar as NonNullable<ProgressBarState['bar']> & ProgressBarBarDataAttributes;

    bar['data-indeterminate'] = isIndeterminate || undefined;

    // `barStyles.brand` (unconditional) and `barStyles[color]` (determinate only) were two
    // mergeClasses arguments setting the same `background-color`; the later one won. That
    // winner is resolved here so a single class is emitted — see the module's header.
    const barColor = !isIndeterminate && color ? color : 'brand';

    state.bar.className = clsx(
      progressBarClassNames.bar,
      styles.bar,
      !isIndeterminate && value > ZERO_THRESHOLD && styles.nonZeroDeterminate,
      styles[barColor],
      state.bar.className,
    );
  }

  if (state.bar && value !== undefined) {
    state.bar.style = {
      width: Math.min(100, Math.max(0, (value / max) * 100)) + '%',
      ...state.bar.style,
    };
  }

  return state;
};
