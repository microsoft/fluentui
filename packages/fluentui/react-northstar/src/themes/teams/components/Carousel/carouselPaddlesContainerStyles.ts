import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselVariables } from './carouselVariables';
import { CarouselPaddlesContainerStylesProps } from '../../../../components/Carousel/CarouselPaddlesContainer';
import { pxToRem } from '../../../../utils';

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
