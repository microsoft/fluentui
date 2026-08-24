import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { SpinButtonState } from './SpinButton.types';

import styles from './SpinButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const spinButtonClassNames: { root: string } = {
  root: componentMarkers('spin-button'),
};

type SpinButtonRootDataAttributes = {
  'data-size'?: SpinButtonState['size'];
};

type SpinButtonButtonDataAttributes = {
  'data-spin-active'?: true;
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled, data-spin-state, data-at-bound and data-invalid on the root; data-invalid is
 * deliberately unused, because it is present for every non-boolean aria-invalid token while the
 * invalid look belongs only to `aria-invalid` true. The spin direction is restamped per stepper
 * because a root-level direction cannot say which of the two buttons is the active one; the bound
 * state needs no CSS, since the headless hook already disables the matching button.
 * The root's appearance/invalid/disabled looks are module classes because their cascade is carried
 * by block order in SpinButton.module.css. */
export const useSpinButtonStyles = (state: SpinButtonState): SpinButtonState => {
  const { appearance, size, spinState } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root: SpinButtonState['root'] & SpinButtonRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      spinButtonClassNames.root,
      styles.root,
      appearance === 'underline' && styles.underline,
      appearance === 'filled-darker' && styles.filledDarker,
      appearance === 'filled-lighter' && styles.filledLighter,
      filled && styles.filled,
      !disabled && appearance === 'outline' && styles.outlineInteractive,
      !disabled && appearance === 'underline' && styles.underlineInteractive,
      !disabled && filled && styles.filledInteractive,
      !disabled && invalid && styles.invalid,
      disabled && styles.disabled,
      state.root.className,
    ),
  };

  // `underline` needs no stepper class: its Griffel slice repeats the stepper reset token for token.
  const buttonAppearance =
    appearance === 'filled-darker'
      ? styles.buttonFilledDarker
      : appearance === 'filled-lighter'
        ? styles.buttonFilledLighter
        : undefined;

  const incrementButton: SpinButtonState['incrementButton'] & SpinButtonButtonDataAttributes = {
    ...state.incrementButton,
    'data-spin-active': spinState === 'up' || undefined,
    className: clsx(styles.button, styles.increment, buttonAppearance, state.incrementButton.className),
  };

  const decrementButton: SpinButtonState['decrementButton'] & SpinButtonButtonDataAttributes = {
    ...state.decrementButton,
    'data-spin-active': spinState === 'down' || undefined,
    className: clsx(styles.button, styles.decrement, buttonAppearance, state.decrementButton.className),
  };

  return {
    ...state,
    root,
    input: { ...state.input, className: clsx(styles.input, state.input.className) },
    incrementButton,
    decrementButton,
  };
};
