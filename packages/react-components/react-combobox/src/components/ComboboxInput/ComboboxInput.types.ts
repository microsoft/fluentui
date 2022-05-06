import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { InputProps, InputSlots, InputState } from '@fluentui/react-input';

export type ComboboxInputSlots = Pick<InputSlots, 'root' | 'input'> & {
  /* The dropdown arrow icon */
  expandIcon: Slot<'span'>;
};

/**
 * ComboboxInput Props
 */
export type ComboboxInputProps = Partial<ComponentProps<ComboboxInputSlots>> &
  Omit<InputProps, 'contentBefore' | 'contentAfter'>;

/**
 * State used in rendering ComboboxInput
 */
export type ComboboxInputState = ComponentState<ComboboxInputSlots> &
  Omit<InputState, 'components' | 'contentBefore' | 'contentAfter'>;
