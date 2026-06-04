import type { Slot } from '@fluentui/react-utilities';
import type { TagPickerControlBaseState } from '@fluentui/react-tag-picker';

export type { TagPickerControlProps, TagPickerControlSlots } from '@fluentui/react-tag-picker';

/**
 * Internal slot rendered by `renderTagPickerControl` to host the expand icon and
 * secondary action.
 */
export type TagPickerControlInternalSlots = {
  aside?: NonNullable<Slot<'span'>>;
};

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
