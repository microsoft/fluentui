import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ComboboxProps } from '@fluentui/react-combobox';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';

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

/**
 * TagPickerInput Base Props - omits design-only props
 */
export type TagPickerInputBaseProps = Omit<TagPickerInputProps, 'appearance'>;

/**
 * TagPickerInput Base State - omits design-only state
 */
export type TagPickerInputBaseState = Omit<TagPickerInputState, 'size'>;
