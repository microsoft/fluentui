import type { TagGroupSlots, TagGroupProps, TagGroupState } from '@fluentui/react-tags';

export type PickerTagGroupSlots = TagGroupSlots;

/**
 * PickerTagGroup Props
 */
export type PickerTagGroupProps = Omit<TagGroupProps, 'onDismiss'>;

/**
 * State used in rendering PickerTagGroup
 */
export type PickerTagGroupState = TagGroupState & {
  hasSelectedOptions: boolean;
};
