import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PickerControlContextValue } from '../../contexts/PickerControlContext';
import { ComboboxSlots, ComboboxProps } from '@fluentui/react-combobox';

export type PickerInputSlots = {
  root: Slot<'input'>;
} & Pick<ComboboxSlots, 'clearIcon' | 'expandIcon'>;

/**
 * PickerInput Props
 */
export type PickerInputProps = Omit<
  ComponentProps<Partial<PickerInputSlots>>,
  'children' | 'size' | 'value' | 'defaultValue'
> &
  Pick<ComboboxProps, 'clearable' | 'size' | 'appearance'> & {
    freeform?: boolean;
    disabled?: boolean;
  };

/**
 * State used in rendering PickerInput
 */
export type PickerInputState = ComponentState<PickerInputSlots> &
  Pick<PickerControlContextValue, 'size' | 'clearable' | 'disabled'> & {
    showClearIcon: boolean;
  };
