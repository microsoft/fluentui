import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonLineSlots = {
  /**
   * The root slot of the `SkeletonLine` is a `div`.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * SkeletonLine Props
 */
export type SkeletonLineProps = ComponentProps<SkeletonLineSlots> & {
  /**
   * The height of the SkeletonLine
   * @defaultValue 16px
   */
  height?: number | string;

  /**
   * Sets vertical alignment of the Line.
   * @defaultvalue center
   */
  verticalAlign?: 'top' | 'center' | 'bottom';

  /**
   * The width of the SkeletonLine
   * @defaultValue 100%
   */
  width?: number | string;
};

/**
 * State used in rendering SkeletonLine
 */
export type SkeletonLineState = ComponentState<SkeletonLineSlots> &
  Required<Pick<SkeletonLineProps, 'height' | 'verticalAlign' | 'width'>>;
