import type { ComponentProps } from '@fluentui/react-utilities';
import type { TagGroupBaseProps } from '@fluentui/react-tags';
import type {
  TagPickerGroupBaseState,
  TagPickerGroupSlots as TagPickerGroupBaseSlots,
} from '@fluentui/react-tag-picker';

export type { TagPickerGroupSlots } from '@fluentui/react-tag-picker';

/**
 * TagPickerGroup Props
 */
export type TagPickerGroupProps = ComponentProps<TagPickerGroupBaseSlots> &
  Pick<TagGroupBaseProps, 'dismissible' | 'onDismiss'>;

/**
 * State used in rendering the headless TagPickerGroup.
 */
export type TagPickerGroupState = TagPickerGroupBaseState & {
  root: {
    /**
     * Present when the group is disabled; omitted otherwise.
     */
    'data-disabled'?: string;
  };
};
