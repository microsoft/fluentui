import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonSlots = {
  /**
   * The root slot of the `Skeleton` is the container that will contain the slots that make up a `Skeleton`
   * and any data that the `Skeleton` will load. The default html element is a `div`.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * Skeleton Props
 */
export type SkeletonProps = Omit<ComponentProps<Partial<SkeletonSlots>>, 'width' | 'animation'> & {
  /**
   * Sets the width value of the skeleton wrapper.
   * @defaultvalue 100%
   */
  width?: number | string;

  /**
   * Sets the appearance of the Skeleton.
   * @defaultvalue false
   */
  materialOs?: boolean;

  /**
   * The animation type for the Skeleton
   * @defaultValue wave
   */
  animation?: string;
};

/**
 * State used in rendering Skeleton
 */
export type SkeletonState = ComponentState<SkeletonSlots> &
  Required<Pick<SkeletonProps, 'animation'>> &
  Pick<SkeletonProps, 'materialOs'>;
