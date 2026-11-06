import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioGroupState, RadioGroupSlots } from './RadioGroup.types';
import styles from './RadioGroup.module.css';

export const radioGroupClassNames: SlotClassNames<RadioGroupSlots> = {
  root: 'fui-RadioGroup',
};

export const useRadioGroupStyles_unstable = (state: RadioGroupState): RadioGroupState => {
  state.root.className = clsx(radioGroupClassNames.root, styles.root, styles[state.layout], state.root.className);
  return state;
};
