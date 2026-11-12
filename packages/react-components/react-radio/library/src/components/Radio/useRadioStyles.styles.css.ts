import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioState, RadioSlots } from './Radio.types';
import styles from './Radio.module.css';

export const radioClassNames: SlotClassNames<RadioSlots> = {
  root: 'fui-Radio',
  indicator: 'fui-Radio__indicator',
  input: 'fui-Radio__input',
  label: 'fui-Radio__label',
};

export const useRadioStyles_unstable = (state: RadioState): RadioState => {
  state.root.className = clsx(radioClassNames.root, styles.root, styles[state.labelPosition], state.root.className);
  state.input.className = clsx(
    radioClassNames.input,
    styles.input,
    state.indicator.children ? styles.customIndicator : styles.defaultIndicator,
    state.input.className,
  );
  state.indicator.className = clsx(radioClassNames.indicator, styles.indicator, state.indicator.className);
  if (state.label) {
    state.label.className = clsx(radioClassNames.label, styles.label, state.label.className);
  }
  return state;
};
