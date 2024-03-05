import { ComboboxProps } from '@fluentui/react-combobox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagPickerControlContextValue } from '../../contexts/TagPickerControlContext';

export type TagPickerControlSlots = {
  root: Slot<'div'>;
};

export type TagPickerControlContextValues = {
  pickerControl: TagPickerControlContextValue;
};

/**
 * PickerControl Props
 */
export type TagPickerControlProps = ComponentProps<TagPickerControlSlots> &
  Pick<ComboboxProps, 'appearance' | 'size' | 'disabled' | 'clearable'> & {};

/**
 * State used in rendering PickerControl
 */
export type TagPickerControlState = ComponentState<TagPickerControlSlots> &
  Required<Pick<TagPickerControlProps, 'appearance' | 'size' | 'disabled' | 'clearable'>>;
