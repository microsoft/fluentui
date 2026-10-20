import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioGroupSlots, RadioGroupState } from './RadioGroup.types';
import styles from './RadioGroup.module.css';

export const radioGroupClassNames: SlotClassNames<RadioGroupSlots> = {
  root: 'fui-RadioGroup',
};

export const useRadioGroupStyles = (state: RadioGroupState): RadioGroupState => {
  state.root.className = clsx(radioGroupClassNames.root, styles.root, state.root.className);

  return state;
};
