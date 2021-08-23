import { getAnimations } from './utils/animations';
import type { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { SkeletonVariables } from './skeletonVariables';
import type { SkeletonStylesProps } from '../../../../components/Skeleton/Skeleton';

export const skeletonStyles: ComponentSlotStylesPrepared<SkeletonStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const animations = getAnimations(v.animationBackground, v.animationBackgroundSecondary);

    return {
      width: '100%',
      ...(p.animation && animations[p.animation]),
    };
  },
};
