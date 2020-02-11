import { pxToRem } from '../../../../utils'
import { CarouselProps, CarouselState } from '../../../../components/Carousel/Carousel'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { CarouselVariables } from './carouselVariables'

const carouselItemStyles: ComponentSlotStylesPrepared<
  CarouselProps & CarouselState,
  CarouselVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    width: pxToRem(v.width),
  }),
}

export default carouselItemStyles
