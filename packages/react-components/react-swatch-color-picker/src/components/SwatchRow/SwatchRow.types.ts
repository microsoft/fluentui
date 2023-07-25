import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SwatchRowSlots = {
  root: Slot<'div'>;
};

/**
 * SwatchRow Props
 */
export type SwatchRowProps = ComponentProps<SwatchRowSlots> & {};

/**
 * State used in rendering SwatchRow
 */
export type SwatchRowState = ComponentState<SwatchRowSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SwatchRowProps.
// & Required<Pick<SwatchRowProps, 'propName'>>
