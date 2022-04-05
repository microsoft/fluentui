import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonButtonStylesProps } from '../../../../components/Skeleton/SkeletonButton';
import { SkeletonVariables } from './skeletonVariables';

export const skeletonButtonStyles: ComponentSlotStylesPrepared<SkeletonButtonStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      display: 'inline-block',
      background: v.buttonBackground,
      height: v.buttonHeight,
      width: v.buttonWidth,
      ...(p.size === 'small' && {
        height: v.buttonSmallHeight,
        width: v.buttonSmallWidth,
      }),
      ...(p.circular && {
        width: v.buttonHeight,
        borderRadius: v.buttonCircularBorderRadius,
        ...(p.size === 'small' && {
          width: v.buttonSmallHeight,
        }),
      }),
      ...(p.iconOnly && {
        width: v.buttonHeight,
        ...(p.size === 'small' && {
          width: v.buttonSmallHeight,
        }),
      }),
      ...(p.fluid && {
        width: '100%',
        maxWidth: '100%',
      }),
    };
  },
};
