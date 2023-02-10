import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonLineSlots = {
  root: Slot<'div'>;
};

/**
 * SkeletonLine Props
 */
export type SkeletonLineProps = ComponentProps<SkeletonLineSlots> & {};

/**
 * State used in rendering SkeletonLine
 */
export type SkeletonLineState = ComponentState<SkeletonLineSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SkeletonLineProps.
// & Required<Pick<SkeletonLineProps, 'propName'>>
