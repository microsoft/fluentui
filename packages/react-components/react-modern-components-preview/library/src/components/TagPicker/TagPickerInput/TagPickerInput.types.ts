import type {
  TagPickerInputProps as TagPickerInputBaseProps,
  TagPickerInputState as TagPickerInputBaseState,
} from '@fluentui/react-headless-components-preview/tag-picker';
export type { TagPickerInputSlots } from '@fluentui/react-headless-components-preview/tag-picker';

export type TagPickerInputProps = TagPickerInputBaseProps & {
  appearance?: 'filled-darker' | 'filled-lighter' | 'outline' | 'underline';
};

export type TagPickerInputState = TagPickerInputBaseState & {
  size: 'extra-large' | 'large' | 'medium';
  root: TagPickerInputBaseState['root'] & {
    'data-size': 'extra-large' | 'large' | 'medium';
  };
};
