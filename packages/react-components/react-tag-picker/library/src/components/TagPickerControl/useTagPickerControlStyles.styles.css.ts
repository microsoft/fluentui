import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TagPickerControlSlots,
  TagPickerControlState,
  TagPickerControlInternalSlots,
} from './TagPickerControl.types';
import styles from './TagPickerControl.module.css';

export const tagPickerControlClassNames: SlotClassNames<TagPickerControlSlots & TagPickerControlInternalSlots> = {
  root: 'fui-TagPickerControl',
  expandIcon: 'fui-TagPickerControl__expandIcon',
  secondaryAction: 'fui-TagPickerControl__secondaryAction',
  aside: 'fui-TagPickerControl__aside',
};

export const tagPickerControlAsideWidthToken = '--fui-TagPickerControl-aside-width' as const;

export const iconSizes = { small: '16px', medium: '20px', large: '24px' };

export const useTagPickerControlStyles_unstable = (state: TagPickerControlState): TagPickerControlState => {
  state.root.className = clsx(
    tagPickerControlClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.appearance],
    state.invalid && styles.invalid,
    state.disabled && styles.disabled,
    state.root.className,
  );
  if (state.aside) {
    state.aside.className = clsx(tagPickerControlClassNames.aside, styles.aside, state.aside.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = clsx(tagPickerControlClassNames.expandIcon, styles.icon, state.expandIcon.className);
  }
  if (state.secondaryAction) {
    state.secondaryAction.className = clsx(
      tagPickerControlClassNames.secondaryAction,
      styles.secondaryAction,
      state.secondaryAction.className,
    );
  }
  return state;
};
