import type {
  SkeletonProps as SkeletonBaseProps,
  SkeletonState as SkeletonBaseState,
} from '@fluentui/react-headless-components-preview/skeleton';
export type { SkeletonSlots } from '@fluentui/react-headless-components-preview/skeleton';

export type SkeletonProps = SkeletonBaseProps & {
  /**
   * The animation type for the Skeleton.
   *
   * @default 'wave'
   */
  animation?: 'wave' | 'pulse';

  /**
   * The appearance of the SkeletonItems within the Skeleton.
   *
   * @default 'opaque'
   */
  appearance?: 'opaque' | 'translucent';
};

export type SkeletonState = SkeletonBaseState & {
  animation: NonNullable<SkeletonProps['animation']>;
  appearance: NonNullable<SkeletonProps['appearance']>;
  size: SkeletonProps['size'];
  shape: SkeletonProps['shape'];
  root: SkeletonBaseState['root'] & {
    'data-animation': NonNullable<SkeletonProps['animation']>;
    'data-appearance': NonNullable<SkeletonProps['appearance']>;
  };
};
