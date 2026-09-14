import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Listbox } from '../../Dropdown/Listbox';

export type TagPickerListSlots = {
  root: Slot<typeof Listbox>;
};

/**
 * TagPickerList Props
 */
export type TagPickerListProps = ComponentProps<TagPickerListSlots>;

/**
 * State used in rendering the headless TagPickerList.
 */
export type TagPickerListState = ComponentState<TagPickerListSlots> & {
  /**
   * Whether the popover is currently open. Visibility is governed by the TagPicker root, which only
   * renders the popover while open or focused.
   */
  open: boolean;
};
