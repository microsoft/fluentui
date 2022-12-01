import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonCircleSlots = {
  /**
   * The root slot of the `SkeletonCircle` is a `div`.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * SkeletonCircle Props
 */
export type SkeletonCircleProps = ComponentProps<SkeletonCircleSlots> & {
  /**
   * The height of the SkeletonCircle
   * @defaultValue 24px
   */
  height?: number | string;

  /**
   * Sets vertical alignment of the Line.
   * @defaultvalue center
   */
  verticalAlign?: 'top' | 'center' | 'bottom';
};

/**
 * State used in rendering SkeletonCircle
 */
export type SkeletonCircleState = ComponentState<SkeletonCircleSlots> &
  Required<Pick<SkeletonCircleProps, 'height' | 'verticalAlign'>>;
