import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Input } from '@fluentui/react-input';

export type SearchBoxSlots = {
  // Root of the component, wrapping the inputs
  root: NonNullable<Slot<typeof Input>>;

  // Element before the input text, within the input border
  contentBefore?: Slot<'span'>;

  // Last element in the input, within the input border
  primaryContentAfter?: Slot<'span'>;

  // Element after the input text, within the input border
  secondaryContentAfter?: Slot<'span'>;
};

/**
 * SearchBox Props
 */
export type SearchBoxProps = ComponentProps<SearchBoxSlots>;

/**
 * State used in rendering SearchBox
 */
export type SearchBoxState = ComponentState<SearchBoxSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SearchBoxProps.
// & Required<Pick<SearchBoxProps, 'propName'>>
