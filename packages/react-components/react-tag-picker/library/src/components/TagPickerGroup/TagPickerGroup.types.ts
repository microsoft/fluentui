import type { TagGroupBaseState, TagGroupSlots, TagGroupState } from '@fluentui/react-tags';
import type { ComponentProps } from '@fluentui/react-utilities';

export type TagPickerGroupSlots = TagGroupSlots;

/**
 * TagPickerGroup Props
 */
export type TagPickerGroupProps = ComponentProps<TagPickerGroupSlots>;

/**
 * State used in rendering TagPickerGroup
 */
export type TagPickerGroupState = TagGroupState & {
  hasSelectedOptions: boolean;
};

/**
 * TagPickerGroup Base Props - same as TagPickerGroupProps (no design-only own props)
 */
export type TagPickerGroupBaseProps = TagPickerGroupProps;

/**
 * TagPickerGroup Base State - omits design-only state sourced from TagPicker context
 */
export type TagPickerGroupBaseState = TagGroupBaseState & {
  hasSelectedOptions: boolean;
};
