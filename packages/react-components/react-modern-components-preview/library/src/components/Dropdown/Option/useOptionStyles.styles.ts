import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { OptionSlots, OptionState } from './Option.types';
import styles from './Option.module.css';

export const optionClassNames: SlotClassNames<OptionSlots> = {
  root: 'fui-Option',
  checkIcon: 'fui-Option__checkIcon',
};

export const useOptionStyles = (state: OptionState): OptionState => {
  state.root.className = clsx(optionClassNames.root, styles.root, state.root.className);

  if (state.checkIcon) {
    state.checkIcon.className = clsx(optionClassNames.checkIcon, styles.checkIcon, state.checkIcon.className);
  }

  return state;
};
