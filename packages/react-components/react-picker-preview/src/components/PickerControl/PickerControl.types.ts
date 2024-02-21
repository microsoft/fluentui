import { ComboboxProps } from '@fluentui/react-combobox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PickerControlContextValue } from '../../contexts/PickerControlContext';

export type PickerControlSlots = {
  root: Slot<'div'>;
};

export type PickerControlContextValues = {
  pickerControl: PickerControlContextValue;
};

/**
 * PickerControl Props
 */
export type PickerControlProps = ComponentProps<PickerControlSlots> &
  Pick<ComboboxProps, 'appearance' | 'size' | 'disabled' | 'clearable'> & {};

/**
 * State used in rendering PickerControl
 */
export type PickerControlState = ComponentState<PickerControlSlots> &
  Required<Pick<PickerControlProps, 'appearance' | 'size' | 'disabled' | 'clearable'>>;
