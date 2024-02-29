import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RatingDisplaySlots = {
  root: Slot<'div'>;
};

/**
 * RatingDisplay Props
 */
export type RatingDisplayProps = ComponentProps<RatingDisplaySlots> & {};

/**
 * State used in rendering RatingDisplay
 */
export type RatingDisplayState = ComponentState<RatingDisplaySlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RatingDisplayProps.
// & Required<Pick<RatingDisplayProps, 'propName'>>
