export type { CarouselButtonProps, CarouselButtonSlots, CarouselButtonState } from './components/CarouselButton/index';
export {
  CarouselButton,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public identity constant; `@deprecated` targets STYLING use by consumers, and this is a re-export / non-styling read (DECISIONS.md D16.5)
  carouselButtonClassNames,
  renderCarouselButton_unstable,
  useCarouselButtonStyles_unstable,
  useCarouselButton_unstable,
} from './components/CarouselButton/index';
