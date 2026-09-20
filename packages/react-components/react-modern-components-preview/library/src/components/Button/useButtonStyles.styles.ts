import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots, ButtonState } from './Button.types';
import styles from './Button.module.css';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

/**
 * Apply styling to the Button slots based on the state
 */
export const useButtonStyles = (state: ButtonState): ButtonState => {
  state.root.className = clsx(buttonClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(buttonClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
