import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonLineStylesProps } from 'src/components/Skeleton/SkeletonLine';
import { SkeletonVariables } from './skeletonVariables';

export const skeletonLineStyles: ComponentSlotStylesPrepared<SkeletonLineStylesProps, SkeletonVariables> = {
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
      marginBottom: v.marginLineBottom,
    };
  },
};
