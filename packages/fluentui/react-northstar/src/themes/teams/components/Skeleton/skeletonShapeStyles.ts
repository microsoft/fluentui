import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonShapeStylesProps } from 'src/components/Skeleton/SkeletonShape';
import { SkeletonVariables } from './skeletonVariables';

export const skeletonShapeStyles: ComponentSlotStylesPrepared<SkeletonShapeStylesProps, SkeletonVariables> = {
  root: ({
    props: p,
    variables: v,
    theme: {
      siteVariables: { colorScheme },
    },
  }): ICSSInJSStyle => {
    return {
      display: 'block',
      width: p.width,
      height: p.height,
      backgroundColor: colorScheme.default.background4,
    };
  },
};
