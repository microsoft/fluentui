import type {
  TagPickerButtonProps as TagPickerButtonBaseProps,
  TagPickerButtonState as TagPickerButtonBaseState,
} from '@fluentui/react-headless-components-preview/tag-picker';
export type { TagPickerButtonSlots } from '@fluentui/react-headless-components-preview/tag-picker';

export type TagPickerButtonProps = TagPickerButtonBaseProps & {
  appearance?: 'filled-darker' | 'filled-lighter' | 'outline' | 'underline';
  size?: 'extra-large' | 'large' | 'medium';
};

export type TagPickerButtonState = TagPickerButtonBaseState & {
  size: 'extra-large' | 'large' | 'medium';
  root: TagPickerButtonBaseState['root'] & { 'data-size': 'extra-large' | 'large' | 'medium' };
};
