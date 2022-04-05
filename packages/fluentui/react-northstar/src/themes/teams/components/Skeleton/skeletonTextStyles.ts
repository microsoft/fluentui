import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonTextStylesProps } from '../../../../components/Skeleton/SkeletonText';
import { SkeletonVariables } from './skeletonVariables';

export const skeletonTextStyles: ComponentSlotStylesPrepared<SkeletonTextStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'block',
      background: v.textBackground,
      height: v.textMediumHeight,
      width: v.textWidth,
      ...(p.size === 'smaller' && {
        height: v.textSmallerHeight,
      }),
      ...(p.size === 'small' && {
        height: v.textSmallHeight,
      }),
      ...(p.size === 'large' && {
        height: v.textLargeHeight,
      }),
      ...(p.size === 'larger' && {
        height: v.textLargerHeight,
      }),
    };
  },
};
