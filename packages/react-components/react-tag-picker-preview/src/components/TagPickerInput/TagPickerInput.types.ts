import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ComboboxProps } from '@fluentui/react-combobox';
import { TagPickerContextValue } from '../../contexts/TagPickerContext';

export type TagPickerInputSlots = {
  root: NonNullable<Slot<'input'>>;
};

/**
 * TagPickerInput Props
 */
export type TagPickerInputProps = Omit<
  ComponentProps<Partial<TagPickerInputSlots>>,
  'children' | 'size' | 'defaultValue'
> &
  Pick<ComboboxProps, 'clearable' | 'appearance'> & {
    disabled?: boolean;
    value?: string;
  };

/**
 * State used in rendering TagPickerInput
 */
export type TagPickerInputState = ComponentState<TagPickerInputSlots> &
  Pick<TagPickerContextValue, 'size' | 'disabled'>;
