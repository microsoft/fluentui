import type { TagPickerProps as TagPickerPropsBase } from '@fluentui/react-tag-picker';

export type {
  TagPickerState,
  TagPickerContextValues,
  TagPickerSlots,
  TagPickerSize,
  TagPickerOnOpenChangeData,
  TagPickerOnOptionSelectData,
} from '@fluentui/react-tag-picker';

export type TagPickerProps = Omit<TagPickerPropsBase, 'inline' | 'size' | 'appearance' | 'mountNode'>;
