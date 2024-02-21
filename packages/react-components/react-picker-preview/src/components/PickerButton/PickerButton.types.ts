import { DropdownProps, DropdownSlots } from '@fluentui/react-combobox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PickerControlContextValue } from '../../contexts/PickerControlContext';

export type PickerButtonSlots = {
  root: Slot<'button'>;
} & Pick<DropdownSlots, 'expandIcon' | 'clearButton'>;

/**
 * PickerButton Props
 */
export type PickerButtonProps = ComponentProps<PickerButtonSlots> &
  Pick<DropdownProps, 'clearable' | 'size' | 'appearance'> & {
    disabled?: boolean;
  };

/**
 * State used in rendering PickerButton
 */
export type PickerButtonState = ComponentState<PickerButtonSlots> &
  Pick<PickerControlContextValue, 'size' | 'clearable' | 'disabled'> & {
    showClearIcon: boolean;
    hasSelectedOption: boolean;
  };
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from PickerButtonProps.
// & Required<Pick<PickerButtonProps, 'propName'>>
