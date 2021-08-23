import type { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { SkeletonLineStylesProps } from '../../../../components/Skeleton/SkeletonLine';
import type { SkeletonVariables } from './skeletonVariables';

export const skeletonLineStyles: ComponentSlotStylesPrepared<SkeletonLineStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'block',
      width: p.width,
      height: p.height,
      backgroundColor: v.lineBackground,
      margin: v.lineMargin,
    };
  },
};
