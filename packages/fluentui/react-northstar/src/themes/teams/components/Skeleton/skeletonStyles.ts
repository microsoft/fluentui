import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonVariables } from './skeletonVariables';
import { SkeletonStylesProps } from '../../../../components/Skeleton/Skeleton';
import { getAnimations } from './utils/animations';

export const skeletonStyles: ComponentSlotStylesPrepared<SkeletonStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const animations = getAnimations(v.animationBackground, v.animationBackgroundSecondary);

    return {
      width: '100%',
      ...(p.animation && animations[p.animation]),
    };
  },
};
