import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonCircleSlots = {
  root: Slot<'div'>;
};

/**
 * SkeletonCircle Props
 */
export type SkeletonCircleProps = ComponentProps<SkeletonCircleSlots> & {};

/**
 * State used in rendering SkeletonCircle
 */
export type SkeletonCircleState = ComponentState<SkeletonCircleSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SkeletonCircleProps.
// & Required<Pick<SkeletonCircleProps, 'propName'>>
