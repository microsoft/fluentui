import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TagPickerControlInternalSlots,
  TagPickerControlSlots,
  TagPickerControlState,
} from './TagPickerControl.types';
import styles from './TagPickerControl.module.css';

export const tagPickerControlClassNames: SlotClassNames<TagPickerControlSlots & TagPickerControlInternalSlots> = {
  root: 'fui-TagPickerControl',
  expandIcon: 'fui-TagPickerControl__expandIcon',
  secondaryAction: 'fui-TagPickerControl__secondaryAction',
  aside: 'fui-TagPickerControl__aside',
};

export const tagPickerControlAsideWidthToken = '--fui-TagPickerControl-aside-width' as const;

export const useTagPickerControlStyles = (state: TagPickerControlState): TagPickerControlState => {
  state.root.className = clsx(tagPickerControlClassNames.root, styles.root, state.root.className);
  if (state.aside) {
    state.aside.className = clsx(tagPickerControlClassNames.aside, styles.aside, state.aside.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      tagPickerControlClassNames.expandIcon,
      styles.expandIcon,
      state.expandIcon.className,
    );
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
