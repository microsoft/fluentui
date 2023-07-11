import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Input, InputState } from '@fluentui/react-input';

export type SearchBoxSlots = {
  // Root of the component, wrapping the inputs
  root: NonNullable<Slot<typeof Input>>;

  // Last element in the input, within the input border
  dismiss?: Slot<'span'>;

  // Element after the input text, within the input border
  contentAfter?: Slot<'span'>;
};

/**
 * SearchBox Props
 */
export type SearchBoxProps = ComponentProps<SearchBoxSlots>;

/**
 * State used in rendering SearchBox
 */
export type SearchBoxState = ComponentState<SearchBoxSlots> &
  Required<Pick<InputState, 'size'>> &
  Required<Pick<SearchBoxProps, 'disabled'>> & {
    focused: boolean;
  };
