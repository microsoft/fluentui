import type { TagGroupSlots, TagGroupProps, TagGroupState } from '@fluentui/react-tags';

export type TagPickerGroupSlots = TagGroupSlots;

/**
 * TagPickerGroup Props
 */
export type TagPickerGroupProps = Omit<TagGroupProps, 'onDismiss' | 'size'>;

/**
 * State used in rendering TagPickerGroup
 */
export type TagPickerGroupState = TagGroupState & {
  hasSelectedOptions: boolean;
};
