import { DropdownProps, DropdownSlots } from '@fluentui/react-combobox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagPickerContextValue } from '../../contexts/TagPickerContext';

export type TagPickerButtonSlots = {
  root: Slot<'button'>;
} & Pick<DropdownSlots, 'expandIcon'>;

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
  Pick<TagPickerContextValue, 'size'> & {
    hasSelectedOption: boolean;
  };
