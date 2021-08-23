import { pxToRem } from '../../../../utils';
import type { CarouselItemStylesProps } from '../../../../components/Carousel/CarouselItem';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { CarouselVariables } from './carouselVariables';

export const carouselItemStyles: ComponentSlotStylesPrepared<CarouselItemStylesProps, CarouselVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    width: pxToRem(v.width),
    marginBottom: pxToRem(16),
    ':focus': {
      outline: 'none',
    },
  }),
};
