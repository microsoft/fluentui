import type {
  TagPickerGroupProps as TagPickerGroupBaseProps,
  TagPickerGroupState as TagPickerGroupBaseState,
} from '@fluentui/react-headless-components-preview/tag-picker';
export type { TagPickerGroupSlots } from '@fluentui/react-headless-components-preview/tag-picker';

export type TagPickerGroupProps = TagPickerGroupBaseProps;

export type TagPickerGroupState = TagPickerGroupBaseState & {
  appearance: 'filled' | 'outline';
  pickerSize: 'extra-large' | 'large' | 'medium';
  size: 'extra-small' | 'small' | 'medium';
  root: TagPickerGroupBaseState['root'] & {
    'data-appearance': 'filled' | 'outline';
    'data-picker-size': 'extra-large' | 'large' | 'medium';
    'data-size': 'extra-small' | 'small' | 'medium';
  };
};
