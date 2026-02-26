import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { SkeletonItemSize, SkeletonProps } from '../Skeleton/Skeleton.types';

export type { SkeletonItemSize };

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
 * State used in rendering SkeletonItem
 */
export type SkeletonItemState = ComponentState<SkeletonItemSlots> &
  Required<Pick<SkeletonItemProps, 'animation' | 'appearance' | 'size' | 'shape'>>;
