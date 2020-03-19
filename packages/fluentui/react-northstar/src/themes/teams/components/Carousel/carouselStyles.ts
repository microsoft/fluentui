import { pxToRem } from '../../../../utils';
import { CarouselProps, CarouselState } from '../../../../components/Carousel/Carousel';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselVariables } from './carouselVariables';

const carouselStyles: ComponentSlotStylesPrepared<CarouselProps & CarouselState, CarouselVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'inline-block'
  }),
  itemsContainerWrapper: ({ variables: v, props: p }): ICSSInJSStyle => ({
    display: 'flex',
    width: pxToRem(v.width),
    overflowX: 'hidden',
    border: '1px solid transparent',

    ...(p.shouldFocusContainer &&
      p.isFromKeyboard && {
        border: `1px solid ${v.focusOuterBorderColor}`,
        borderRadius: v.focusOuterBorderRadius
      })
  }),
  itemsContainer: (): ICSSInJSStyle => ({
    padding: 0,
    margin: 0,
    display: 'flex',
    listStyle: 'none',
    willChange: 'transform'
  }),
  paddleNext: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.paddleNextSize),
    top: pxToRem(-v.height / 2 - v.paddleNextSize / 2),
    left: pxToRem(v.width - 2 * v.paddleNextSize),
    ...(p.items !== undefined && {
      visibility: !p.circular && p.activeIndex === p.items.length - 1 ? 'hidden' : 'visible'
    })
  }),
  paddlePrevious: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.paddlePreviousSize),
    top: pxToRem(-v.height / 2 - v.paddlePreviousSize / 2),
    ...(p.items !== undefined && {
      visibility: !p.circular && p.activeIndex === 0 ? 'hidden' : 'visible'
    })
  })
};

export default carouselStyles;
