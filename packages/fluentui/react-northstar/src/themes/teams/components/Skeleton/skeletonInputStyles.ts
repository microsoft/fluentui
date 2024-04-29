import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SkeletonInputStylesProps } from '../../../../components/Skeleton/SkeletonInput';
import { SkeletonVariables } from './skeletonVariables';

export const skeletonInputStyles: ComponentSlotStylesPrepared<SkeletonInputStylesProps, SkeletonVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      flexDirection: 'column',
      justifyContent: 'center',
      display: 'inline-flex',
      position: 'relative',
      height: v.inputHeight,
      width: v.inputWidth,
      background: v.inputBackground,
      ...(p.fluid && { width: '100%' }),
    };
  },
};
