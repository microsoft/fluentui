import { pxToRem } from '../../../../utils'
import { CarouselProps, CarouselState } from '../../../../components/Carousel/Carousel'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { CarouselVariables } from './carouselVariables'

const carouselStyles: ComponentSlotStylesPrepared<
  CarouselProps & CarouselState,
  CarouselVariables
> = {
  root: (): ICSSInJSStyle => ({
    display: 'inline-block',
  }),
  itemsContainerWrapper: ({ variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    width: pxToRem(v.width),
    overflowX: 'hidden',
  }),
  itemsContainer: ({ props: p, variables: v }): ICSSInJSStyle => ({
    padding: 0,
    margin: 0,
    display: 'flex',
    listStyle: 'none',
    transform: `translateX(${pxToRem(-v.width * p.activeIndex)})`,
    transitionDuration: '.4s',
    willChange: 'transform',
  }),
  paddleNext: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.paddleNextSize),
    top: pxToRem(-v.height / 2 - v.paddleNextSize / 2),
    left: pxToRem(v.width - 2 * v.paddleNextSize),
    ...(p.items !== undefined && {
      visibility: !p.circular && p.activeIndex === p.items.length - 1 ? 'hidden' : 'visible',
    }),
  }),
  paddlePrevious: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: pxToRem(v.paddlePreviousSize),
    top: pxToRem(-v.height / 2 - v.paddlePreviousSize / 2),
    ...(p.items !== undefined && {
      visibility: !p.circular && p.activeIndex === 0 ? 'hidden' : 'visible',
    }),
  }),
}

export default carouselStyles
