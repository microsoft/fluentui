import type { DropdownProps } from '@fluentui/react-combobox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';

export type TagPickerButtonSlots = {
  root: Slot<'button'>;
};

/**
 * PickerButton Props
 */
export type TagPickerButtonProps = ComponentProps<TagPickerButtonSlots> &
  Pick<DropdownProps, 'size' | 'appearance'> & {
    disabled?: boolean;
  };

/**
 * State used in rendering PickerButton
 */
export type TagPickerButtonState = ComponentState<TagPickerButtonSlots> &
  Pick<TagPickerContextValue, 'size'> & {
    hasSelectedOption: boolean;
  };

/**
 * TagPickerButton Base Props - omits design-only props
 */
export type TagPickerButtonBaseProps = Omit<TagPickerButtonProps, 'size' | 'appearance'>;

/**
 * TagPickerButton Base State - omits design-only state
 */
export type TagPickerButtonBaseState = Omit<TagPickerButtonState, 'size'>;
