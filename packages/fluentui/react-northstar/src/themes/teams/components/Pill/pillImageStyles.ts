import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillImageStylesProps } from '../../../../components/Pill/PillImage';
import { PillVariables } from './pillVariables';

export const pillImageStyles: ComponentSlotStylesPrepared<PillImageStylesProps, PillVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    width: v.imageWidth,
    height: v.imageHeight,
    borderRadius: '50%',
    ...(p.size === 'small' && {
      width: v.smallImageWidth,
      height: v.smallImageHeight,
    }),
    ...(p.size === 'smaller' && {
      width: v.smallerImageWidth,
      height: v.smallerImageHeight,
    }),
  }),
};
