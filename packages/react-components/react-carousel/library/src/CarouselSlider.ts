export type {
  CarouselSliderContextValue,
  CarouselSliderProps,
  CarouselSliderSlots,
  CarouselSliderState,
} from './components/CarouselSlider/index';
export {
  CarouselSlider,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
  carouselSliderClassNames,
  renderCarouselSlider_unstable,
  useCarouselSliderStyles_unstable,
  useCarouselSlider_unstable,
} from './components/CarouselSlider/index';
