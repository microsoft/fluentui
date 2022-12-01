import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SkeletonSlots = {
  /**
   * The root slot of the `Skeleton` is the container that will contain the slots that make up a `Skeleton`
   * and any data that the `Skeleton` will load. The default html element is a `div`.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The slot that will show the Skeleton gradient on the page. The default html element is a div.
   */
  gradient: NonNullable<Slot<'div'>>;
};

/**
 * Skeleton Props
 */
export type SkeletonProps = Omit<ComponentProps<Partial<SkeletonSlots>>, 'width' | 'animation'> & {
  /**
   * Sets the width value of the skeleton wave wrapper.
   * @defaultvalue 100%
   */
  width?: number | string;

  /**
   * Controls when the skeleton is swapped with actual data through an animated transition.
   * @defaultvalue false
   */
  isDataLoaded?: boolean;

  /**
   * The background color to set for the Skeleton
   * @defaultvalue colorNeutralStencil1
   */
  skeletonColor?: string;

  /**
   * The animation type for the Skeleton
   * @defaultValue wave
   */
  animation?: string;
};

/**
 * State used in rendering Skeleton
 */
export type SkeletonState = ComponentState<SkeletonSlots> & Required<Pick<SkeletonProps, 'isDataLoaded' | 'animation'>>;
