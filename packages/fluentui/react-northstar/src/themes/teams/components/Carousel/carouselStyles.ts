import { pxToRem } from '../../../../utils';
import { CarouselStylesProps } from '../../../../components/Carousel/Carousel';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselVariables } from './carouselVariables';

export const carouselStyles: ComponentSlotStylesPrepared<CarouselStylesProps, CarouselVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'inline-block',
    position: 'relative',
  }),
  itemsContainerWrapper: ({ variables: v, props: p }): ICSSInJSStyle => ({
    display: 'flex',
    width: pxToRem(v.width),
    overflowX: 'hidden',
    ...(p.shouldFocusContainer &&
      p.isFromKeyboard && {
        border: `1px solid ${v.focusOuterBorderColor}`,
        borderRadius: v.focusOuterBorderRadius,
      }),
  }),
  itemsContainer: (): ICSSInJSStyle => ({
    padding: 0,
    margin: 0,
    display: 'flex',
    listStyle: 'none',
    willChange: 'transform',
  }),
};
