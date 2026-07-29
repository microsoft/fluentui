export { Carousel } from './Carousel';
export type {
  CarouselAnnouncerFunction,
  CarouselMotion,
  CarouselProps,
  CarouselSlots,
  CarouselState,
  CarouselUpdateData,
  CarouselVisibilityChangeEvent,
  CarouselVisibilityEventDetail,
} from './Carousel.types';
export { renderCarousel_unstable } from './renderCarousel';
export { useCarousel_unstable } from './useCarousel';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
export { carouselClassNames, useCarouselStyles_unstable } from './useCarouselStyles.styles';
