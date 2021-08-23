import type { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { SkeletonShapeStylesProps } from '../../../../components/Skeleton/SkeletonShape';
import type { SkeletonVariables } from './skeletonVariables';

export const skeletonShapeStyles: ComponentSlotStylesPrepared<SkeletonShapeStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'block',
      width: p.width,
      height: p.height,
      backgroundColor: v.shapeBackground,
      margin: v.shapeMargin,
      ...(p.round && { borderRadius: '50%' }),
    };
  },
};
