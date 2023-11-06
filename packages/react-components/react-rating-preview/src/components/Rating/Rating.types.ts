import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RatingSlots = {
  root: Slot<'div'>;
};

/**
 * Rating Props
 */
export type RatingProps = ComponentProps<RatingSlots> & {};

/**
 * State used in rendering Rating
 */
export type RatingState = ComponentState<RatingSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RatingProps.
// & Required<Pick<RatingProps, 'propName'>>
