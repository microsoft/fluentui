import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonSlots = {
  root: Slot<'div'>;
};

/**
 * Skeleton Props
 */
export type SkeletonProps = ComponentProps<SkeletonSlots> & {};

/**
 * State used in rendering Skeleton
 */
export type SkeletonState = ComponentState<SkeletonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SkeletonProps.
// & Required<Pick<SkeletonProps, 'propName'>>
