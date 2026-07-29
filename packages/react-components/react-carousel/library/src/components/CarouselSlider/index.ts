export { CarouselSlider } from './CarouselSlider';
export type {
  CarouselSliderContextValue,
  CarouselSliderProps,
  CarouselSliderSlots,
  CarouselSliderState,
} from './CarouselSlider.types';
export { renderCarouselSlider_unstable } from './renderCarouselSlider';
export { useCarouselSlider_unstable } from './useCarouselSlider';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
export { carouselSliderClassNames, useCarouselSliderStyles_unstable } from './useCarouselSliderStyles.styles';
