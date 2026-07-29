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
 * TagPickerGroup Base State - omits design-only state.
 */
export type TagPickerGroupBaseState = TagGroupBaseState & {
  hasSelectedOptions: boolean;
};
