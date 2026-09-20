import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { LabelSlots, LabelState } from './Label.types';
import styles from './Label.module.css';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  root: 'fui-Label',
  required: 'fui-Label__required',
};

/**
 * Apply styling to the Label slots based on the state.
 */
export const useLabelStyles = (state: LabelState): LabelState => {
  state.root.className = clsx(labelClassNames.root, styles.root, state.root.className);

  if (state.required) {
    state.required.className = clsx(labelClassNames.required, styles.required, state.required.className);
  }

  return state;
};
