import type {
  TagPickerControlProps as TagPickerControlBaseProps,
  TagPickerControlState as TagPickerControlBaseState,
} from '@fluentui/react-headless-components-preview/tag-picker';
export type {
  TagPickerControlInternalSlots,
  TagPickerControlSlots,
} from '@fluentui/react-headless-components-preview/tag-picker';

export type TagPickerControlProps = TagPickerControlBaseProps;

export type TagPickerControlState = TagPickerControlBaseState & {
  appearance: 'filled-darker' | 'filled-lighter' | 'outline' | 'underline';
  size: 'extra-large' | 'large' | 'medium';
  root: TagPickerControlBaseState['root'] & {
    'data-appearance': 'filled-darker' | 'filled-lighter' | 'outline' | 'underline';
    'data-size': 'extra-large' | 'large' | 'medium';
  };
};
