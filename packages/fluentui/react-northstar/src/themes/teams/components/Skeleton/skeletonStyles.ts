import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonVariables } from './skeletonVariables';
import { SkeletonStylesProps } from 'src/components/Skeleton/Skeleton';
import { getAnimations } from './utils/animations';

export const skeletonStyles: ComponentSlotStylesPrepared<SkeletonStylesProps, SkeletonVariables> = {
  root: ({
    props: p,
    variables: v,
    theme: {
      siteVariables: { colorScheme },
    },
  }): ICSSInJSStyle => {
    const animations = getAnimations(colorScheme.default.background);

    return {
      width: '100%',
      ...(p.animation && animations[p.animation]),
    };
  },
};
