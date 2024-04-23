import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Listbox } from '@fluentui/react-combobox';
import { TagPickerContextValue } from '../../contexts/TagPickerContext';

export type TagPickerListSlots = {
  root: Slot<typeof Listbox>;
};

/**
 * TagPickerList Props
 */
export type TagPickerListProps = ComponentProps<TagPickerListSlots>;

/**
 * State used in rendering TagPickerList
 */
export type TagPickerListState = ComponentState<TagPickerListSlots> & Pick<TagPickerContextValue, 'open'>;
