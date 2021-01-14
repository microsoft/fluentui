import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselVariables } from './carouselVariables';
import { CarouselPaddlesContainerStylesProps } from '../../../../components/Carousel/CarouselPaddlesContainer';

export const carouselPaddlesContainerStyles: ComponentSlotStylesPrepared<
  CarouselPaddlesContainerStylesProps,
  CarouselVariables
> = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }),
};
