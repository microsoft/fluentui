import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SpinButtonSlots, SpinButtonState } from './SpinButton.types';
import styles from './SpinButton.module.css';

export const spinButtonClassNames: SlotClassNames<SpinButtonSlots> = {
  root: 'fui-SpinButton',
  input: 'fui-SpinButton__input',
  incrementButton: 'fui-SpinButton__incrementButton',
  decrementButton: 'fui-SpinButton__decrementButton',
};

const spinButtonActiveClassName = 'fui-SpinButton__button_active';

export const useSpinButtonStyles = (state: SpinButtonState): SpinButtonState => {
  state.root.className = clsx(spinButtonClassNames.root, styles.root, state.root.className);
  state.input.className = clsx(spinButtonClassNames.input, styles.input, state.input.className);
  state.incrementButton.className = clsx(
    spinButtonClassNames.incrementButton,
    state.spinState === 'up' && spinButtonActiveClassName,
    styles.button,
    styles.incrementButton,
    state.incrementButton.className,
  );
  state.decrementButton.className = clsx(
    spinButtonClassNames.decrementButton,
    state.spinState === 'down' && spinButtonActiveClassName,
    styles.button,
    styles.decrementButton,
    state.decrementButton.className,
  );

  return state;
};
