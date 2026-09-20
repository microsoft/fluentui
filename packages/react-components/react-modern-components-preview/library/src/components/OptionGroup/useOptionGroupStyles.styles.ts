import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { OptionGroupSlots, OptionGroupState } from './OptionGroup.types';
import styles from './OptionGroup.module.css';

export const optionGroupClassNames: SlotClassNames<OptionGroupSlots> = {
  root: 'fui-OptionGroup',
  label: 'fui-OptionGroup__label',
};

export const useOptionGroupStyles = (state: OptionGroupState): OptionGroupState => {
  state.root.className = clsx(optionGroupClassNames.root, styles.root, state.root.className);

  if (state.label) {
    state.label.className = clsx(optionGroupClassNames.label, styles.label, state.label.className);
  }

  return state;
};
