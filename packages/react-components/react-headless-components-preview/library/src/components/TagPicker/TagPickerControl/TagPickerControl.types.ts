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
     * Data attribute set when the control is disabled.
     */
    'data-disabled'?: string;
    /**
     * Data attribute set when the control is in an invalid (error) field state.
     */
    'data-invalid'?: string;
  };
};
