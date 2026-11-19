import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { LabelSlots, LabelState } from './Label.types';
import styles from './Label.module.css';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  root: 'fui-Label',
  required: 'fui-Label__required',
};

export const useLabelStyles_unstable = (state: LabelState): LabelState => {
  state.root.className = clsx(
    labelClassNames.root,
    styles.root,
    state.disabled && styles.disabled,
    styles[state.size],
    state.weight === 'semibold' && styles.semibold,
    state.root.className,
  );

  if (state.required) {
    state.required.className = clsx(
      labelClassNames.required,
      styles.required,
      state.disabled && styles.disabled,
      state.required.className,
    );
  }

  return state;
};
