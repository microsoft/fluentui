import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CheckboxSlots, CheckboxState } from './Checkbox.types';
import styles from './Checkbox.module.css';

export const checkboxClassNames: SlotClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
};

export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  state.root.className = clsx(checkboxClassNames.root, styles.root, state.root.className);
  state.input.className = clsx(
    checkboxClassNames.input,
    styles.input,
    state.size === 'large' && styles.inputLarge,
    state.input.className,
  );

  if (state.indicator) {
    state.indicator.className = clsx(
      checkboxClassNames.indicator,
      styles.indicator,
      state.size === 'large' && styles.indicatorLarge,
      state.shape === 'circular' && styles.indicatorCircular,
      state.indicator.className,
    );
  }

  if (state.label) {
    state.label.className = clsx(
      checkboxClassNames.label,
      styles.label,
      state.size === 'large' ? styles.labelLarge : styles.labelMedium,
      state.label.className,
    );
  }

  return state;
};
