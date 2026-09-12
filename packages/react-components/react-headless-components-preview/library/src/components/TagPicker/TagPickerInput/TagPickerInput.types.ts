import type { TagPickerInputBaseState } from '@fluentui/react-tag-picker';

export type { TagPickerInputBaseProps as TagPickerInputProps, TagPickerInputSlots } from '@fluentui/react-tag-picker';

/**
 * State used in rendering the headless TagPickerInput.
 */
export type TagPickerInputState = TagPickerInputBaseState & {
  root: {
    /**
     * Present when the input is disabled; omitted otherwise.
     */
    'data-disabled'?: string;
  };
};
