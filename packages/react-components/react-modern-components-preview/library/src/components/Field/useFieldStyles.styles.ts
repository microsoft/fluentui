import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { FieldSlots, FieldState } from './Field.types';
import styles from './Field.module.css';

export const fieldClassNames: SlotClassNames<FieldSlots> = {
  root: 'fui-Field',
  label: 'fui-Field__label',
  validationMessage: 'fui-Field__validationMessage',
  validationMessageIcon: 'fui-Field__validationMessageIcon',
  hint: 'fui-Field__hint',
};

/**
 * Apply styling to the Field slots based on the state.
 */
export const useFieldStyles = (state: FieldState): FieldState => {
  state.root.className = clsx(fieldClassNames.root, styles.root, state.root.className);

  if (state.label) {
    state.label.className = clsx(fieldClassNames.label, styles.label, state.label.className);
  }
  if (state.validationMessageIcon) {
    state.validationMessageIcon.className = clsx(
      fieldClassNames.validationMessageIcon,
      styles.validationMessageIcon,
      state.validationMessageIcon.className,
    );
  }
  if (state.validationMessage) {
    state.validationMessage.className = clsx(
      fieldClassNames.validationMessage,
      styles.validationMessage,
      state.validationMessage.className,
    );
  }
  if (state.hint) {
    state.hint.className = clsx(fieldClassNames.hint, styles.hint, state.hint.className);
  }

  return state;
};
