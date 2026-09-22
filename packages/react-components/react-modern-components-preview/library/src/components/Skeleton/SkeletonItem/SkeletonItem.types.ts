import type {
  SkeletonItemProps as SkeletonItemBaseProps,
  SkeletonItemState as SkeletonItemBaseState,
} from '@fluentui/react-headless-components-preview/skeleton';
import type { SkeletonProps } from '../Skeleton/Skeleton.types';
export type { SkeletonItemSlots } from '@fluentui/react-headless-components-preview/skeleton';

export type SkeletonItemProps = SkeletonItemBaseProps &
  Pick<SkeletonProps, 'animation' | 'appearance' | 'size' | 'shape'>;

export type SkeletonItemState = SkeletonItemBaseState & {
  animation: NonNullable<SkeletonItemProps['animation']>;
  appearance: NonNullable<SkeletonItemProps['appearance']>;
  size: NonNullable<SkeletonItemProps['size']>;
  shape: NonNullable<SkeletonItemProps['shape']>;
  root: SkeletonItemBaseState['root'] & {
    'data-animation': NonNullable<SkeletonItemProps['animation']>;
    'data-appearance': NonNullable<SkeletonItemProps['appearance']>;
    'data-size': `${NonNullable<SkeletonItemProps['size']>}`;
    'data-shape': NonNullable<SkeletonItemProps['shape']>;
  };
};
