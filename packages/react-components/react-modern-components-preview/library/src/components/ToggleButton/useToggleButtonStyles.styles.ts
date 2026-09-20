import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ToggleButtonSlots, ToggleButtonState } from './ToggleButton.types';
import buttonStyles from '../Button/Button.module.css';
import styles from './ToggleButton.module.css';

export const toggleButtonClassNames: SlotClassNames<ToggleButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

export const useToggleButtonStyles = (state: ToggleButtonState): ToggleButtonState => {
  state.root.className = clsx(toggleButtonClassNames.root, buttonStyles.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(toggleButtonClassNames.icon, buttonStyles.icon, styles.icon, state.icon.className);
  }

  return state;
};
