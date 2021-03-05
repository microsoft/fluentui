import { pxToRem } from '../../../../utils';
import { CarouselItemStylesProps } from '../../../../components/Carousel/CarouselItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselVariables } from './carouselVariables';

export const carouselItemStyles: ComponentSlotStylesPrepared<CarouselItemStylesProps, CarouselVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    width: pxToRem(v.width),
    marginBottom: pxToRem(16),
    ':focus': {
      outline: 'none',
    },
  }),
};
