import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SpinButtonState, SpinButtonSlots } from './SpinButton.types';
import styles from './SpinButton.module.css';

export const spinButtonClassNames: SlotClassNames<SpinButtonSlots> = {
  root: 'fui-SpinButton',
  input: 'fui-SpinButton__input',
  incrementButton: 'fui-SpinButton__incrementButton',
  decrementButton: 'fui-SpinButton__decrementButton',
};

export const useSpinButtonStyles_unstable = (state: SpinButtonState): SpinButtonState => {
  const disabled = state.input.disabled;
  state.root.className = clsx(
    spinButtonClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.appearance],
    state.appearance.startsWith('filled') && styles.filled,
    disabled && styles.disabled,
    String(state.input['aria-invalid']) === 'true' && styles.invalid,
    state.root.className,
  );
  state.incrementButton.className = clsx(
    spinButtonClassNames.incrementButton,
    state.spinState === 'up' && 'fui-SpinButton__button_active',
    styles.incrementButton,
    state.incrementButton.className,
  );
  state.decrementButton.className = clsx(
    spinButtonClassNames.decrementButton,
    state.spinState === 'down' && 'fui-SpinButton__button_active',
    styles.decrementButton,
    state.decrementButton.className,
  );
  state.input.className = clsx(spinButtonClassNames.input, styles.input, state.input.className);
  return state;
};
