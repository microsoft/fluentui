import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type EmptySwatchSlots = {
  root: Slot<'div'>;
};

/**
 * EmptySwatch Props
 */
export type EmptySwatchProps = ComponentProps<EmptySwatchSlots> & {};

/**
 * State used in rendering EmptySwatch
 */
export type EmptySwatchState = ComponentState<EmptySwatchSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from EmptySwatchProps.
// & Required<Pick<EmptySwatchProps, 'propName'>>
