import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ComboboxSlots, ComboboxProps } from '@fluentui/react-combobox';
import { TagPickerContextValue } from '../../contexts/TagPickerContext';

export type TagPickerInputSlots = {
  root: Slot<'input'>;
} & Pick<ComboboxSlots, 'expandIcon'>;

/**
 * TagPickerInput Props
 */
export type TagPickerInputProps = Omit<
  ComponentProps<Partial<TagPickerInputSlots>>,
  'children' | 'size' | 'defaultValue'
> &
  Pick<ComboboxProps, 'clearable' | 'appearance'> & {
    freeform?: boolean;
    disabled?: boolean;
    value?: string;
  };

/**
 * State used in rendering TagPickerInput
 */
export type TagPickerInputState = ComponentState<TagPickerInputSlots> &
  Pick<TagPickerContextValue, 'size' | 'disabled'>;
