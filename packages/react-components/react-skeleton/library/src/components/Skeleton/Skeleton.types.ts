import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SkeletonContextValue } from '../../contexts/index';

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
export type SkeletonProps = Omit<ComponentProps<Partial<SkeletonSlots>>, 'width'> & {
  /**
   * The animation type for the Skeleton
   * @defaultValue wave
   */
  animation?: 'wave' | 'pulse';

  /**
   * Sets the appearance of the Skeleton.
   * @defaultValue opaque
   */
  appearance?: 'opaque' | 'translucent';

  /**
   * Sets the width value of the skeleton wrapper.
   * @defaultValue 100%
   * @deprecated Use `className` prop to set width
   */
  width?: number | string;
};

export type SkeletonContextValues = {
  skeletonGroup: SkeletonContextValue;
};

/**
 * State used in rendering Skeleton
 */
export type SkeletonState = ComponentState<SkeletonSlots> & Required<Pick<SkeletonProps, 'animation' | 'appearance'>>;
