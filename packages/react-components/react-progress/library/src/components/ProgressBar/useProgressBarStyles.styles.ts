import { clsx } from 'clsx';
import type { ProgressBarState } from './ProgressBar.types';

import styles from './ProgressBar.module.css';

/**
 * Public identity classes for ProgressBar.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-ProgressBar`,
 * `fui-ProgressBar__bar`) are no longer rendered and the per-slot keys are gone; there is no
 * public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + progressBarClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(progressBarClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const progressBarClassNames: { root: string } = {
  root: 'group/fui-progress-bar',
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(styles.root, progressBarClassNames.root, styles[shape], state.root.className);

  if (state.bar) {
    const bar = state.bar as NonNullable<ProgressBarState['bar']> & ProgressBarBarDataAttributes;

    bar['data-indeterminate'] = isIndeterminate || undefined;

    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    const barColor = !isIndeterminate && color ? color : 'brand';

    state.bar.className = clsx(
      styles.bar,
      !isIndeterminate && value > ZERO_THRESHOLD && styles['non-zero-determinate'],
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
