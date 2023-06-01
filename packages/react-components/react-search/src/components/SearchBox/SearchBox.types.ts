import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SearchBoxSlots = {
  root: Slot<'div'>;
};

/**
 * SearchBox Props
 */
export type SearchBoxProps = ComponentProps<SearchBoxSlots> & {};

/**
 * State used in rendering SearchBox
 */
export type SearchBoxState = ComponentState<SearchBoxSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SearchBoxProps.
// & Required<Pick<SearchBoxProps, 'propName'>>
