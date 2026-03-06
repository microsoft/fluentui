import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';
import type { SkeletonProps } from '../Skeleton/Skeleton.types';

export type SkeletonItemSlots = {
  root: Slot<'div', 'span'>;
};

/**
 * SkeletonItem Props
 */
export type SkeletonItemProps = ComponentProps<SkeletonItemSlots> &
  Pick<SkeletonProps, 'size' | 'shape'> & {
    /**
     * Sets the animation of the SkeletonItem
     * @default wave
     */
    animation?: 'wave' | 'pulse';

    /**
     * Sets the appearance of the SkeletonItem
     * @default opaque
     */
    appearance?: 'opaque' | 'translucent';
  };

/**
 * SkeletonItem base props, excluding design-related props like animation, appearance, size, and shape.
 */
export type SkeletonItemBaseProps = DistributiveOmit<SkeletonItemProps, 'animation' | 'appearance' | 'size' | 'shape'>;

/**
 * State used in rendering SkeletonItem
 */
export type SkeletonItemState = ComponentState<SkeletonItemSlots> &
  Required<Pick<SkeletonItemProps, 'animation' | 'appearance' | 'size' | 'shape'>>;

/**
 * SkeletonItem base state, excluding design-related state like animation, appearance, size, and shape.
 */
export type SkeletonItemBaseState = DistributiveOmit<SkeletonItemState, 'animation' | 'appearance' | 'size' | 'shape'>;
