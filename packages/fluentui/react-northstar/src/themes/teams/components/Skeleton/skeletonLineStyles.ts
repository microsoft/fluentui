import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonLineStylesProps } from '../../../../components/Skeleton/SkeletonLine';
import { SkeletonVariables } from './skeletonVariables';

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
