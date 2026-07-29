export type { CarouselCardProps, CarouselCardSlots, CarouselCardState } from './components/CarouselCard/index';
export {
  CarouselCard,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
  carouselCardClassNames,
  renderCarouselCard_unstable,
  useCarouselCardStyles_unstable,
  useCarouselCard_unstable,
} from './components/CarouselCard/index';
