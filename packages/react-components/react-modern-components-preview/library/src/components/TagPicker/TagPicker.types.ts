import type {
  TagPickerProps as TagPickerBaseProps,
  TagPickerState as TagPickerBaseState,
} from '@fluentui/react-headless-components-preview/tag-picker';
export type {
  TagPickerContextValue,
  TagPickerContextValues,
  TagPickerOnOpenChangeData,
  TagPickerOnOptionSelectData,
  TagPickerSize,
  TagPickerSlots,
} from '@fluentui/react-headless-components-preview/tag-picker';

export type TagPickerProps = TagPickerBaseProps & {
  appearance?: 'filled-darker' | 'filled-lighter' | 'outline' | 'underline';
  size?: 'extra-large' | 'large' | 'medium';
};

export type TagPickerState = TagPickerBaseState & {
  appearance: NonNullable<TagPickerProps['appearance']>;
  size: NonNullable<TagPickerProps['size']>;
};
