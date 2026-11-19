import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CheckboxSlots, CheckboxState } from './Checkbox.types';
import styles from './Checkbox.module.css';

export const checkboxClassNames: SlotClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
};

export const useCheckboxStyles_unstable = (state: CheckboxState): CheckboxState => {
  state.root.className = clsx(
    checkboxClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.shape],
    styles[state.labelPosition],
    styles[state.checked === 'mixed' ? 'mixed' : state.checked ? 'checked' : 'unchecked'],
    state.disabled && styles.disabled,
    state.root.className,
  );
  state.input.className = clsx(checkboxClassNames.input, styles.input, state.input.className);
  if (state.indicator) {
    state.indicator.className = clsx(checkboxClassNames.indicator, styles.indicator, state.indicator.className);
  }
  if (state.label) {
    state.label.className = clsx(checkboxClassNames.label, styles.label, state.label.className);
  }

  return state;
};
