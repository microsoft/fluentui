import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TagPickerControlContextValue } from '../../contexts/TagPickerControlContext';
import { ComboboxSlots, ComboboxProps } from '@fluentui/react-combobox';

export type TagPickerInputSlots = {
  root: Slot<'input'>;
} & Pick<ComboboxSlots, 'clearIcon' | 'expandIcon'>;

/**
 * TagPickerInput Props
 */
export type TagPickerInputProps = Omit<
  ComponentProps<Partial<TagPickerInputSlots>>,
  'children' | 'size' | 'defaultValue'
> &
  Pick<ComboboxProps, 'clearable' | 'size' | 'appearance'> & {
    freeform?: boolean;
    disabled?: boolean;
    value?: string;
  };

/**
 * State used in rendering TagPickerInput
 */
export type TagPickerInputState = ComponentState<TagPickerInputSlots> &
  Pick<TagPickerControlContextValue, 'size' | 'clearable' | 'disabled'> & {
    showClearIcon: boolean;
  };
