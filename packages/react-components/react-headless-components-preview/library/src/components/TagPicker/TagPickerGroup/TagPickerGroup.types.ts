import type { ComponentProps } from '@fluentui/react-utilities';
import type { TagGroupBaseProps } from '@fluentui/react-tags';
import type {
  TagPickerGroupBaseState,
  TagPickerGroupSlots as TagPickerGroupBaseSlots,
} from '@fluentui/react-tag-picker';

export type TagPickerGroupSlots = TagPickerGroupBaseSlots;

/**
 * TagPickerGroup Props
 */
export type TagPickerGroupProps = ComponentProps<TagPickerGroupSlots> &
  Pick<TagGroupBaseProps, 'dismissible' | 'onDismiss'>;

/**
 * State used in rendering the headless TagPickerGroup.
 */
export type TagPickerGroupState = TagPickerGroupBaseState & {
  root: {
    /**
     * Data attribute set when the group is disabled.
     */
    'data-disabled'?: string;
  };
};
