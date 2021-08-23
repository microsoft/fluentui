import { pxToRem } from '../../../../utils';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { CarouselVariables } from './carouselVariables';
import type { CarouselPaddlesContainerStylesProps } from '../../../../components/Carousel/CarouselPaddlesContainer';

export const carouselPaddlesContainerStyles: ComponentSlotStylesPrepared<
  CarouselPaddlesContainerStylesProps,
  CarouselVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    width: pxToRem(v.width),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }),
};
