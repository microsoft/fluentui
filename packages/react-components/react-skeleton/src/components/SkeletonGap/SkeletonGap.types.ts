import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonGapSlots = {
  /**
   * The root slot of the `SkeletonGap` is a `div`.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * SkeletonGap Props
 */
export type SkeletonGapProps = ComponentProps<SkeletonGapSlots> & {
  /**
   * The height of the SkeletonGap
   * @defaultValue 16px
   */
  height?: number | string;

  /**
   * The width of the SkeletonGap
   * @defaultValue 100%
   */
  width?: number | string;
};

/**
 * State used in rendering SkeletonGap
 */
export type SkeletonGapState = ComponentState<SkeletonGapSlots> & Required<Pick<SkeletonGapProps, 'height' | 'width'>>;
