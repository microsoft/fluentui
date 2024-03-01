import { DropdownProps, DropdownSlots } from '@fluentui/react-combobox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagPickerControlContextValue } from '../../contexts/TagPickerControlContext';

export type TagPickerButtonSlots = {
  root: Slot<'button'>;
} & Pick<DropdownSlots, 'expandIcon' | 'clearButton'>;

/**
 * PickerButton Props
 */
export type TagPickerButtonProps = ComponentProps<TagPickerButtonSlots> &
  Pick<DropdownProps, 'clearable' | 'size' | 'appearance'> & {
    disabled?: boolean;
  };

/**
 * State used in rendering PickerButton
 */
export type TagPickerButtonState = ComponentState<TagPickerButtonSlots> &
  Pick<TagPickerControlContextValue, 'size' | 'clearable' | 'disabled'> & {
    showClearIcon: boolean;
    hasSelectedOption: boolean;
  };
