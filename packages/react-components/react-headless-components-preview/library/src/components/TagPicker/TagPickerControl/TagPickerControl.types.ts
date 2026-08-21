import type { TagPickerControlBaseState } from '@fluentui/react-tag-picker';

export type {
  TagPickerControlInternalSlots,
  TagPickerControlProps,
  TagPickerControlSlots,
} from '@fluentui/react-tag-picker';

/**
 * State used in rendering the headless TagPickerControl.
 */
export type TagPickerControlState = TagPickerControlBaseState & {
  root: {
    /**
     * Present when the control is disabled; omitted otherwise.
     */
    'data-disabled'?: string;
    /**
     * Present when the control is in an invalid field state; omitted otherwise.
     */
    'data-invalid'?: string;
  };
};
