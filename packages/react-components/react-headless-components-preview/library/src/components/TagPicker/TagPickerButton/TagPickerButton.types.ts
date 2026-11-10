import type { TagPickerButtonBaseState } from '@fluentui/react-tag-picker';

export type {
  TagPickerButtonBaseProps as TagPickerButtonProps,
  TagPickerButtonSlots,
} from '@fluentui/react-tag-picker';

/**
 * State used in rendering the headless TagPickerButton.
 */
export type TagPickerButtonState = TagPickerButtonBaseState & {
  root: {
    /**
     * Data attribute set when the button is disabled.
     */
    'data-disabled'?: string;
  };
};
