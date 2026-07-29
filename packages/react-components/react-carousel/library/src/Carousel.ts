export type {
  CarouselAnnouncerFunction,
  CarouselMotion,
  CarouselProps,
  CarouselSlots,
  CarouselState,
  CarouselUpdateData,
  CarouselVisibilityChangeEvent,
  CarouselVisibilityEventDetail,
} from './components/Carousel/index';
export {
  Carousel,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
  carouselClassNames,
  renderCarousel_unstable,
  useCarouselStyles_unstable,
  useCarousel_unstable,
} from './components/Carousel/index';
