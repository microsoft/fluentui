import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonShapeStylesProps } from '../../../../components/Skeleton/SkeletonShape';
import { SkeletonVariables } from './skeletonVariables';

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
