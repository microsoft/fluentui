import type { ComponentProps } from '@fluentui/react-utilities';
import type { TagPickerGroupBaseState, TagPickerGroupSlots } from '@fluentui/react-tag-picker';

export type { TagPickerGroupSlots };

/**
 * TagPickerGroup Props
 */
export type TagPickerGroupProps = ComponentProps<TagPickerGroupSlots>;

/**
 * State used in rendering the headless TagPickerGroup.
 */
export type TagPickerGroupState = TagPickerGroupBaseState & {
  root: {
    /**
     * Native WICG `focusgroup` attribute for arrow-key navigation across the selected tags.
     * Replaces the Tabster `useArrowNavigationGroup` used by the styled TagPickerGroup.
     */
    focusgroup?: string;
    /**
     * Data attribute set when the group is disabled.
     */
    'data-disabled'?: string;
  };
};
