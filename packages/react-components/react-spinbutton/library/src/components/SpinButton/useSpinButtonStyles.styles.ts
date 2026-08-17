import { clsx } from 'clsx';
import type { SpinButtonState } from './SpinButton.types';

import styles from './SpinButton.module.css';

/**
 * Public identity classes for SpinButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (`migration/griffel-to-tailwind/reports/DECISIONS.md`,
 * D15.1 / D16.5) — usable as a selector and as a `group-*` variant target. The per-slot keys
 * (`input`, `incrementButton`, `decrementButton`) were removed: there is no public class-name
 * handle on component internals any more.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + spinButtonClassNames.root` is invalid. Use `fuiSelector()` from
 * `@fluentui/react-utilities` (or `@fluentui/react-components`) at every selector site.
 */
export const spinButtonClassNames: { root: string } = {
  root: 'group/fui-spin-button',
};

/**
 * Data attribute rendered on whichever of the two button slots is currently spinning, and
 * matched by `&:where([data-spin-active])` in SpinButton.module.css.
 *
 * This replaces the internal `fui-SpinButton__button_active` class (DECISIONS.md D16.3).
 * That class was never exported — it was a JS-driven state marker that deliberately outlives
 * `:active`, so it is not expressible natively and D15.6's "data attributes as a fallback
 * where native cannot reach" applies exactly. It could not stay a class either: after D16 a
 * `fui-`-prefixed class in rendered DOM means "public identity", and an internal one would
 * have been the only counterexample in the repo.
 *
 * Written `flag || undefined` for the same reason as the root's presence flags: React omits
 * an attribute whose value is `undefined`, whereas `false` would render
 * `data-spin-active="false"` and still match `[data-spin-active]`.
 */
type SpinButtonButtonDataAttributes = {
  'data-spin-active'?: true;
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
 */
type SpinButtonRootDataAttributes = {
  'data-size': SpinButtonState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * Apply styling to the SpinButton slots based on the state
 */
export const useSpinButtonStyles_unstable = (state: SpinButtonState): SpinButtonState => {
  const { appearance, spinState, size } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root = state.root as SpinButtonState['root'] & SpinButtonRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    spinButtonClassNames.root,
    styles[appearance],
    filled && styles.filled,
    state.root.className,
  );

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  const incrementButton = state.incrementButton as SpinButtonState['incrementButton'] & SpinButtonButtonDataAttributes;
  const decrementButton = state.decrementButton as SpinButtonState['decrementButton'] & SpinButtonButtonDataAttributes;

  incrementButton['data-spin-active'] = spinState === 'up' || undefined;
  decrementButton['data-spin-active'] = spinState === 'down' || undefined;

  state.incrementButton.className = clsx(styles.button, styles.increment, state.incrementButton.className);

  state.decrementButton.className = clsx(styles.button, styles.decrement, state.decrementButton.className);

  state.input.className = clsx(styles.input, state.input.className);

  return state;
};
