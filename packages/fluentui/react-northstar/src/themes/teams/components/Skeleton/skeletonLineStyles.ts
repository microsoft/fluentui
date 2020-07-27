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
      marginTop: v.marginLineTop,
      marginBottom: v.marginLineBottom,
      backgroundColor: colorScheme.default.background4,
    };
  },
};
